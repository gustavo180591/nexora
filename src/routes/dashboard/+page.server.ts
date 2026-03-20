import { requireUser } from '$lib/server/auth/guards';

export async function load({ locals }) {
  const user = requireUser(locals);

  return {
    user
  };
}