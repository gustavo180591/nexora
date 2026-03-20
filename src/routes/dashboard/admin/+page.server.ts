import { requireRole } from '$lib/server/auth/guards';

export async function load({ locals }) {
  const user = requireRole(locals, ['ADMIN']);

  return {
    user
  };
}