import { PrismaClient } from '@prisma/client';

declare global {
  // Allow global var declarations in development to prevent duplicate instances
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const isProduction = process.env.NODE_ENV === 'production';

export const prisma =
  globalThis.prisma ||
  new PrismaClient({
    log: isProduction ? ['error'] : ['query', 'info', 'warn', 'error'],
  });

if (!isProduction) {
  globalThis.prisma = prisma;
}

export default prisma;
