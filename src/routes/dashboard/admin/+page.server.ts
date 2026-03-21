import { requireRole } from '$lib/server/auth/guards';

import type { LocalsParams } from '$lib/server/types';

export async function load({ locals }: LocalsParams) {
  const user = requireRole(locals, ['ADMIN']);

  return {
    user
  };
}