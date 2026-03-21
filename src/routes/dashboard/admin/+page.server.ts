import { prisma } from '$lib/server/db';
import { requireRole } from '$lib/server/auth/guards';
import type { LocalsParams } from '$lib/server/types';

export async function load({ locals }: LocalsParams) {
  requireRole(locals, ['ADMIN']);

  const [paidOrders, ordersByStatus, sellersCount, recentOrders, recentWebhooks] =
    await Promise.all([
      prisma.order.findMany({
        where: { status: 'PAID' },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.order.groupBy({
        by: ['status'],
        _count: {
          status: true
        }
      }),
      prisma.seller.count(),
      prisma.order.findMany({
        orderBy: { createdAt: 'desc' },
        take: 10,
        include: {
          user: {
            select: {
              email: true
            }
          },
          seller: {
            select: {
              id: true,
              stripeAccountId: true
            }
          }
        }
      }),
      prisma.webhookEvent.findMany({
        orderBy: { createdAt: 'desc' },
        take: 10
      })
    ]);

  const totalVolume = paidOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const totalFees = Math.round(totalVolume * 0.1);
  const totalNet = totalVolume - totalFees;

  const metricsByStatus = {
    PENDING: 0,
    PAID: 0,
    FAILED: 0,
    CANCELED: 0
  };

  for (const item of ordersByStatus) {
    metricsByStatus[item.status] = item._count.status;
  }

  return {
    summary: {
      totalVolume,
      totalFees,
      totalNet,
      paidOrdersCount: paidOrders.length,
      sellersCount
    },
    metricsByStatus,
    recentOrders,
    recentWebhooks
  };
}