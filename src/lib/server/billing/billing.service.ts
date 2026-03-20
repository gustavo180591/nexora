import { prisma } from '$lib/server/db';
import { stripe } from '$lib/server/stripe';
import { calculatePlatformFee } from './config';

type CreateCheckoutInput = {
  userId: string;
  email: string;
  items: Array<{
    name: string;
    unitAmount: number;
    quantity: number;
  }>;
  currency?: string;
  sellerId?: string; // 🔥 Nuevo para marketplace
};

export async function createCheckoutSession(input: CreateCheckoutInput) {
  const currency = input.currency ?? 'usd';

  const subtotalAmount = input.items.reduce(
    (acc, item) => acc + item.unitAmount * item.quantity,
    0
  );

  // 🔥 Get seller info if provided
  let seller = null;
  if (input.sellerId) {
    seller = await prisma.seller.findUnique({
      where: { id: input.sellerId }
    });
  }

  const order = await prisma.order.create({
    data: {
      userId: input.userId,
      sellerId: input.sellerId,
      currency,
      subtotalAmount,
      totalAmount: subtotalAmount,
      status: 'PENDING'
    }
  });

  // 🔥 BUILD SESSION WITH SPLIT PAYMENTS
  const sessionConfig: any = {
    mode: 'payment',
    customer_email: input.email,
    line_items: input.items.map((item) => ({
      quantity: item.quantity,
      price_data: {
        currency,
        product_data: {
          name: item.name
        },
        unit_amount: item.unitAmount
      }
    })),
    success_url: `${process.env.PUBLIC_APP_URL}/dashboard/payments/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.PUBLIC_APP_URL}/dashboard/payments/cancel`,
    metadata: {
      orderId: order.id,
      userId: input.userId
    }
  };

  // 🔥 SPLIT PAYMENTS - CORAZÓN DEL MARKETPLACE
  if (seller?.stripeAccountId) {
    const commissionAmount = calculatePlatformFee(subtotalAmount); // 🎯 Config central
    
    sessionConfig.payment_intent_data = {
      application_fee_amount: commissionAmount,
      transfer_data: {
        destination: seller.stripeAccountId
      }
    };
  }

  const session = await stripe.checkout.sessions.create(sessionConfig);

  await prisma.order.update({
    where: { id: order.id },
    data: {
      stripeSessionId: session.id
    }
  });

  await prisma.payment.create({
    data: {
      orderId: order.id,
      provider: 'STRIPE',
      status: 'PENDING',
      amount: subtotalAmount,
      currency
    }
  });

  return {
    orderId: order.id,
    checkoutUrl: session.url,
    sessionId: session.id
  };
}