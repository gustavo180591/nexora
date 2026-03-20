import { stripe } from '$lib/server/stripe';
import { prisma } from '$lib/server/db';

export async function createConnectAccount(userId: string, email: string) {
  const account = await stripe.accounts.create({
    type: 'express',
    email
  });

  await prisma.seller.create({
    data: {
      userId,
      stripeAccountId: account.id
    }
  });

  return account;
}

export async function createAccountLink(accountId: string) {
  const link = await stripe.accountLinks.create({
    account: accountId,
    refresh_url: `${process.env.PUBLIC_APP_URL}/dashboard/connect/refresh`,
    return_url: `${process.env.PUBLIC_APP_URL}/dashboard/connect/success`,
    type: 'account_onboarding'
  });

  return link.url;
}

export async function getSellerByUserId(userId: string) {
  return prisma.seller.findUnique({
    where: { userId },
    include: { user: true }
  });
}

export async function updateSellerOnboarding(accountId: string) {
  // Fetch account details from Stripe
  const account = await stripe.accounts.retrieve(accountId);
  
  // Update seller onboarding status
  await prisma.seller.update({
    where: { stripeAccountId: accountId },
    data: {
      onboardingComplete: account.charges_enabled && account.payouts_enabled
    }
  });

  return account;
}
