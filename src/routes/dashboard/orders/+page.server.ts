import { prisma } from '$lib/server/db';
import { requireUser } from '$lib/server/auth/guards';
import type { LocalsParams } from '$lib/server/types';

export async function load({ locals }: LocalsParams) {
  const user = requireUser(locals);

  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' }
  });

  return { orders };
}
