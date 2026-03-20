import type { Handle } from '@sveltejs/kit';
import { getSession, getSessionCookie } from '$lib/server/auth/session';

export const handle: Handle = async ({ event, resolve }) => {
  const token = getSessionCookie(event.cookies);
  const session = await getSession(token);

  event.locals.user = session?.user ?? null;

  return resolve(event);
};