import { stripe } from '$lib/server/stripe';
import { prisma } from '$lib/server/db';
import { formatMoney } from '$lib/utils/money';

export interface PayoutData {
  stripeId: string;
  amount: number;
  currency: string;
  status: string;
  arrivalDate?: Date | null;
  sellerId: string;
}

export async function syncPayoutsFromStripe(sellerId?: string) {
  try {
    console.log('🔄 Syncing payouts from Stripe...');
    
    // Get payouts from Stripe
    const stripePayouts = await stripe.payouts.list({
      limit: 100,
      expand: ['data.destination']
    });

    let syncedCount = 0;
    let errorCount = 0;

    for (const payout of stripePayouts.data) {
      try {
        // Find seller by Stripe account (this would need to be enhanced)
        const seller = await prisma.seller.findFirst({
          where: {
            stripeAccountId: {
              // This is a simplified approach - in production you'd map Stripe accounts to sellers
              contains: payout.destination?.id || ''
            }
          }
        });

        if (!seller) {
          console.warn(`⚠️ No seller found for payout ${payout.id}`);
          errorCount++;
          continue;
        }

        // Upsert payout
        await prisma.payout.upsert({
          where: { stripeId: payout.id },
          update: {
            amount: payout.amount,
            currency: payout.currency.toUpperCase(),
            status: payout.status,
            arrivalDate: payout.arrival_date 
              ? new Date(payout.arrival_date * 1000) 
              : null
          },
          create: {
            stripeId: payout.id,
            amount: payout.amount,
            currency: payout.currency.toUpperCase(),
            status: payout.status,
            arrivalDate: payout.arrival_date 
              ? new Date(payout.arrival_date * 1000) 
              : null,
            sellerId: seller.id
          }
        });

        syncedCount++;
        console.log(`✅ Synced payout ${payout.id}: ${formatMoney(payout.amount)}`);
      } catch (error) {
        console.error(`❌ Error syncing payout ${payout.id}:`, error);
        errorCount++;
      }
    }

    console.log(`🎯 Payout sync complete: ${syncedCount} synced, ${errorCount} errors`);
    
    return {
      synced: syncedCount,
      errors: errorCount,
      total: stripePayouts.data.length
    };
  } catch (error) {
    console.error('💥 Fatal error syncing payouts:', error);
    throw error;
  }
}

export async function getPayoutsForSeller(sellerId: string) {
  return await prisma.payout.findMany({
    where: { sellerId },
    orderBy: { createdAt: 'desc' },
    take: 50
  });
}

export async function getAllPayouts(limit = 50) {
  return await prisma.payout.findMany({
    include: {
      seller: {
        select: {
          id: true,
          user: { select: { email: true } },
          stripeAccountId: true
        }
      }
    },
    orderBy: { createdAt: 'desc' },
    take: limit
  });
}

export async function getPayoutSummary() {
  const [totalPayouts, pendingPayouts, recentPayouts] = await Promise.all([
    prisma.payout.aggregate({
      _sum: { amount: true },
      _count: { id: true }
    }),
    prisma.payout.count({
      where: { status: 'in_transit' }
    }),
    prisma.payout.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: {
        seller: {
          select: {
            user: { select: { email: true } }
          }
        }
      }
    })
  ]);

  return {
    totalAmount: totalPayouts._sum.amount || 0,
    totalCount: totalPayouts._count.id,
    pendingCount: pendingPayouts,
    recentPayouts
  };
}
