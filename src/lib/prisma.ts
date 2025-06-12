import { PrismaClient } from '@prisma/client';

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



/* console.log(process.env.DATABASE_URL);
console.log(process.env.NODE_ENV); */

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
