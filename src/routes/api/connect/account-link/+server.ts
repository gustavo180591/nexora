import { json } from '@sveltejs/kit';
import { createAccountLink, getSellerByUserId } from '$lib/server/billing/connect.service';
import { requireUser } from '$lib/server/auth/guards';
import { error } from '@sveltejs/kit';
import type { RequestWithLocalsParams } from '$lib/server/types';

export async function POST({ request, locals }: RequestWithLocalsParams) {
  const user = requireUser(locals);
  const { accountId } = await request.json();

  // Verify user owns this account
  const seller = await getSellerByUserId(user.id);
  if (!seller || seller.stripeAccountId !== accountId) {
    throw error(403, 'Unauthorized');
  }

  const accountLinkUrl = await createAccountLink(accountId);

  return json({ url: accountLinkUrl });
}
