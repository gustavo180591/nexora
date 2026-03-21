import { json } from '@sveltejs/kit';
import { deleteSession, clearSessionCookie, getSessionCookie } from '$lib/server/auth/session';
import type { CookiesParams } from '$lib/server/types';

export async function POST({ cookies }: CookiesParams) {
  const token = getSessionCookie(cookies);
  deleteSession(token);
  clearSessionCookie(cookies);

  return json({ success: true });
}