
import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaClient } from '../../prisma/generated/client'


const prisma = new PrismaClient().$extends(withAccelerate())

const globalForPrisma = global as unknown as { prisma: typeof prisma }

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma

/* import { PrismaClient } from "@prisma/client";


const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['error'],
    errorFormat: 'pretty',
    transactionOptions: {
      maxWait: 15000,
      timeout: 16000
    }
  });


if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
 */