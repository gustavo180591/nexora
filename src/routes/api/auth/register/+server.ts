import { json } from '@sveltejs/kit';
import { registerSchema } from '$lib/server/auth/auth.schema';
import { registerUser } from '$lib/server/auth/auth.service';
import { createSession, setSessionCookie } from '$lib/server/auth/session';
import type { RequestParams } from '$lib/server/types';

export async function POST({ request, cookies }: RequestParams) {
  const raw = await request.json();
  const parsed = registerSchema.safeParse(raw);

  if (!parsed.success) {
    return json(
      {
        error: 'VALIDATION_ERROR',
        details: parsed.error.flatten()
      },
      { status: 400 }
    );
  }

  try {
    const user = await registerUser(parsed.data);
    const token = await createSession(user.id);
    setSessionCookie(cookies, token);

    return json({ user }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === 'EMAIL_IN_USE') {
      return json({ error: 'EMAIL_IN_USE' }, { status: 409 });
    }

    return json({ error: 'INTERNAL_SERVER_ERROR' }, { status: 500 });
  }
}