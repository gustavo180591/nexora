import { prisma } from '$lib/server/db';
import { requireUser } from '$lib/server/auth/guards';
import { stripe } from '$lib/server/stripe';
import type { LocalsParams } from '$lib/server/types';

export async function load({ locals }: LocalsParams) {
  const user = requireUser(locals);

  const seller = await prisma.seller.findUnique({
    where: { userId: user.id }
  });

  let connect = {
    hasAccount: false,
    onboardingComplete: false
  };

  if (seller?.stripeAccountId) {
    const account = await stripe.accounts.retrieve(seller.stripeAccountId);

    const onboardingComplete =
      account.details_submitted &&
      account.charges_enabled &&
      account.payouts_enabled;

    connect = {
      hasAccount: true,
      onboardingComplete
    };

    // sync DB
    if (seller.onboardingComplete !== onboardingComplete) {
      await prisma.seller.update({
        where: { id: seller.id },
        data: { onboardingComplete }
      });
    }
  }

  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' }
  });

  return {
    user,
    orders,
    connect
  };
}