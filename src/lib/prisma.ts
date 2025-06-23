import { PrismaClient } from "@prisma/client";

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

/* let prisma: PrismaClient;

if (typeof window === "undefined") {
  if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
  } else {
    if (!(global as any).prisma) {
      (global as any).prisma = new PrismaClient();
    }
    prisma = (global as any).prisma;
  }
} else {
  // In the browser, prisma is undefined
  prisma = undefined as unknown as PrismaClient;
}

export default prisma; */

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