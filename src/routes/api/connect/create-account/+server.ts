import { json } from '@sveltejs/kit';
import { createConnectAccount } from '$lib/server/billing/connect.service';
import { requireUser } from '$lib/server/auth/guards';
import type { LocalsParams } from '$lib/server/types';

export async function POST({ locals }: LocalsParams) {
  const user = requireUser(locals);

  const account = await createConnectAccount(user.id, user.email);

  return json({ accountId: account.id });
}
