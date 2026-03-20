import { json } from '@sveltejs/kit';
import { loginSchema } from '$lib/server/auth/auth.schema';
import { loginUser } from '$lib/server/auth/auth.service';
import { createSession, setSessionCookie } from '$lib/server/auth/session';

export async function POST({ request, cookies }) {
  const raw = await request.json();
  const parsed = loginSchema.safeParse(raw);

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
    const user = await loginUser(parsed.data);
    const token = await createSession(user.id);
    setSessionCookie(cookies, token);

    return json({ user }, { status: 200 });
  } catch (error) {
    if (error instanceof Error && error.message === 'INVALID_CREDENTIALS') {
      return json({ error: 'INVALID_CREDENTIALS' }, { status: 401 });
    }

    return json({ error: 'INTERNAL_SERVER_ERROR' }, { status: 500 });
  }
}