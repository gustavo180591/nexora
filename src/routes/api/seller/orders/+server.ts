import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/db';
import { requireUser } from '$lib/server/auth/guards';
import { calculatePlatformFee, formatCurrency } from '$lib/server/billing/config';

export async function GET({ locals }) {
  const user = requireUser(locals);

  const seller = await prisma.seller.findUnique({
    where: { userId: user.id }
  });

  if (!seller) {
    return json({ orders: [] });
  }

  const orders = await prisma.order.findMany({
    where: { sellerId: seller.id },
    include: {
      user: {
        select: { email: true }
      },
      payments: {
        select: {
          status: true,
          stripePaymentIntentId: true,
          stripeChargeId: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  const ordersWithFinancials = orders.map(order => {
    const platformFee = calculatePlatformFee(order.totalAmount);
    const netAmount = order.totalAmount - platformFee;

    return {
      id: order.id,
      status: order.status,
      currency: order.currency,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      customerEmail: order.user.email,
      stripeSessionId: order.stripeSessionId,
      payments: order.payments,
      // 🎯 Info financiera clara
      grossAmount: order.totalAmount,
      platformFee,
      netAmount,
      formatted: {
        grossAmount: formatCurrency(order.totalAmount, order.currency),
        platformFee: formatCurrency(platformFee, order.currency),
        netAmount: formatCurrency(netAmount, order.currency)
      }
    };
  });

  return json({ orders: ordersWithFinancials });
}
