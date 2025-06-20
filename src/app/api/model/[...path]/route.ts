import { getEnhancedPrisma } from '@/lib/enhanced-prisma';
import { NextRequestHandler } from '@zenstackhq/server/next';

const handler = NextRequestHandler({
  getPrisma: () => getEnhancedPrisma(),
  useAppDir: true,
});

export { handler as DELETE, handler as GET, handler as PATCH, handler as POST, handler as PUT };


/* 
import { authOptionsZenstack } from '@/lib/auth/config';
import prisma from '@/lib/prisma';
import { enhance } from '@zenstackhq/runtime';
import { NextRequestHandler } from '@zenstackhq/server/next';
import { getServerSession } from 'next-auth';

const handler = NextRequestHandler({
  getPrisma: () => getPrisma(),
  useAppDir: true,
});


async function getPrisma() {
  const session = await getServerSession(authOptionsZenstack);
  //@ts-ignore
  return enhance(prisma, { user: session?.user });
}



export { handler as DELETE, handler as GET, handler as PATCH, handler as POST, handler as PUT };
 */