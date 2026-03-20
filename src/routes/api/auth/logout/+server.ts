import { json } from '@sveltejs/kit';
import {
  clearSessionCookie,
  deleteSession,
  getSessionCookie
} from '$lib/server/auth/session';

export async function POST({ cookies }) {
  const token = getSessionCookie(cookies);
  deleteSession(token);
  clearSessionCookie(cookies);

  return json({ success: true });
}