import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/db';
import { stripe } from '$lib/server/stripe';
import { requireUser } from '$lib/server/auth/guards';

export async function GET({ locals }) {
  const user = requireUser(locals);

  const seller = await prisma.seller.findUnique({
    where: { userId: user.id }
  });

  if (!seller?.stripeAccountId) {
    return json({
      hasSellerAccount: false,
      onboardingComplete: false,
      account: null
    });
  }

  const account = await stripe.accounts.retrieve(seller.stripeAccountId);

  const onboardingComplete =
    account.details_submitted &&
    !!account.charges_enabled &&
    !!account.payouts_enabled;

  if (seller.onboardingComplete !== onboardingComplete) {
    await prisma.seller.update({
      where: { id: seller.id },
      data: { onboardingComplete }
    });
  }

  return json({
    hasSellerAccount: true,
    onboardingComplete,
    account: {
      id: account.id,
      chargesEnabled: account.charges_enabled,
      payoutsEnabled: account.payouts_enabled,
      detailsSubmitted: account.details_submitted
    }
  });
}
