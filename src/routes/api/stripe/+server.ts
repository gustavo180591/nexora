import { stripe } from '$lib/server/stripe';
import { prisma } from '$lib/server/db';
import { error } from '@sveltejs/kit';

export async function POST({ request }) {
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    throw error(400, 'Missing stripe-signature header');
  }

  const body = await request.text();

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    throw error(400, 'Invalid webhook signature');
  }

  // 🔥 IDEMPOTENCIA
  const existingEvent = await prisma.webhookEvent.findUnique({
    where: { id: event.id }
  });

  if (existingEvent?.processed) {
    return new Response('Event already processed');
  }

  // 🔥 GUARDAR PAYLOAD SIEMPRE (antes de procesar)
  await prisma.webhookEvent.upsert({
    where: { id: event.id },
    update: {},
    create: {
      id: event.id,
      type: event.type,
      payload: event
    }
  });

  try {
    // 🔥 PROCESAMIENTO SEGURO
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      const orderId = session.metadata?.orderId;

      if (orderId) {
        const order = await prisma.order.findUnique({
          where: { id: orderId }
        });

        // 🔥 evitar reprocesar orden ya pagada
        if (order?.status !== 'PAID') {
          await prisma.order.update({
            where: { id: orderId },
            data: { status: 'PAID' }
          });

          await prisma.payment.updateMany({
            where: { orderId },
            data: {
              status: 'SUCCEEDED',
              stripePaymentIntentId:
                typeof session.payment_intent === 'string'
                  ? session.payment_intent
                  : null
            }
          });
        }
      }
    }

    if (event.type === 'checkout.session.expired') {
      const session = event.data.object;
      const orderId = session.metadata?.orderId;

      if (orderId) {
        const order = await prisma.order.findUnique({
          where: { id: orderId }
        });

        if (order?.status !== 'CANCELED') {
          await prisma.order.update({
            where: { id: orderId },
            data: { status: 'CANCELED' }
          });

          await prisma.payment.updateMany({
            where: { orderId },
            data: { status: 'CANCELED' }
          });
        }
      }
    }

    // 🔥 marcar evento como procesado
    await prisma.webhookEvent.update({
      where: { id: event.id },
      data: { processed: true }
    });

    return new Response('ok');
  } catch (err) {
    // 🔥 GUARDAR ERRORES
    await prisma.webhookEvent.update({
      where: { id: event.id },
      data: {
        error: err instanceof Error ? err.message : 'Unknown error'
      }
    });

    console.error('Webhook processing error:', err);
    throw error(500, 'Webhook processing failed');
  }
}