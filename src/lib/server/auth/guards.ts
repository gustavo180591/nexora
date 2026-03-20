import { error, redirect } from '@sveltejs/kit';

export function requireUser(locals: App.Locals) {
  if (!locals.user) {
    throw redirect(302, '/login');
  }

  return locals.user;
}

export function requireRole(
  locals: App.Locals,
  roles: Array<'ADMIN' | 'SELLER' | 'BUYER'>
) {
  const user = requireUser(locals);

  if (!roles.includes(user.role)) {
    throw error(403, 'Forbidden');
  }

  return user;
}