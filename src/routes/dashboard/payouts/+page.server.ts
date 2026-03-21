import { prisma } from '$lib/server/db';
import { requireRole } from '$lib/server/auth/guards';
import { getPayoutSummary, getAllPayouts } from '$lib/server/billing/payouts.service';
import type { LocalsParams } from '$lib/server/types';

export async function load({ locals }: LocalsParams) {
  const user = requireRole(locals, ['ADMIN']);

  const [summary, payouts] = await Promise.all([
    getPayoutSummary(),
    getAllPayouts(50)
  ]);

  // Calculate reconciliation metrics
  const totalOrdersAmount = await prisma.order.aggregate({
    where: { status: 'PAID' },
    _sum: { totalAmount: true },
    _count: { id: true }
  });

  const platformFees = Math.round((totalOrdersAmount._sum.totalAmount || 0) * 0.1);
  const sellerNet = (totalOrdersAmount._sum.totalAmount || 0) - platformFees;
  const actualPayouts = summary.totalAmount;
  const reconciliationDiff = sellerNet - actualPayouts;

  return {
    summary,
    payouts,
    reconciliation: {
      totalOrdersAmount: totalOrdersAmount._sum.totalAmount || 0,
      platformFees,
      sellerNet,
      actualPayouts,
      reconciliationDiff,
      ordersCount: totalOrdersAmount._count.id
    }
  };
}
