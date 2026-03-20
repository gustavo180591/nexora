import { json } from '@sveltejs/kit';
import { createCheckoutSession } from '$lib/server/billing/billing.service';
import { requireUser } from '$lib/server/auth/guards';

export async function POST({ request, locals }) {
  const user = requireUser(locals);
  const body = await request.json();

  const result = await createCheckoutSession({
    userId: user.id,
    email: user.email,
    items: body.items
  });

  return json(result, { status: 201 });
}