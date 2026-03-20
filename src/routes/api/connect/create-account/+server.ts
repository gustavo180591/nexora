import { json } from '@sveltejs/kit';
import { createConnectAccount } from '$lib/server/billing/connect.service';
import { requireUser } from '$lib/server/auth/guards';

export async function POST({ locals }) {
  const user = requireUser(locals);

  const account = await createConnectAccount(user.id, user.email);

  return json({ accountId: account.id });
}
