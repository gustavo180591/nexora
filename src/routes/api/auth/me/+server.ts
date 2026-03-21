import { json } from '@sveltejs/kit';
import type { LocalsParams } from '$lib/server/types';

export async function GET({ locals }: LocalsParams) {
  if (!locals.user) {
    return json({ user: null }, { status: 401 });
  }

  return json({ user: locals.user });
}