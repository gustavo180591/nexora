import { prisma } from '$lib/server/db';
import { randomUUID } from 'crypto';
import type { Cookies } from '@sveltejs/kit';

const SESSION_COOKIE = 'nexora_session';
const SESSION_DURATION = 1000 * 60 * 60 * 24 * 7; // 7 días

export async function createSession(userId: string) {
  const token = randomUUID();

  await prisma.session.create({
    data: {
      token,
      userId,
      expiresAt: new Date(Date.now() + SESSION_DURATION)
    }
  });

  return token;
}

export async function getSession(token?: string) {
  if (!token) return null;

  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: true }
  });

  if (!session) return null;

  // sesión expirada
  if (session.expiresAt < new Date()) {
    await prisma.session.delete({ where: { token } });
    return null;
  }

  return session;
}

export async function deleteSession(token?: string) {
  if (!token) return;

  await prisma.session.delete({
    where: { token }
  }).catch(() => {});
}

export function setSessionCookie(cookies: Cookies, token: string) {
  cookies.set(SESSION_COOKIE, token, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7
  });
}

export function clearSessionCookie(cookies: Cookies) {
  cookies.delete(SESSION_COOKIE, {
    path: '/'
  });
}

export function getSessionCookie(cookies: Cookies) {
  return cookies.get(SESSION_COOKIE);
}