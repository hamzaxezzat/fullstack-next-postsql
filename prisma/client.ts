import { PrismaClient } from '@prisma/client';

declare global {
  namespace NodeS {
    interface Global {}
  }
}
// add prisma to the Node]S global type
interface CustomNodeJsGlobal extends NodeS.Global {
  prisma: PrismaClient;
}
// Prevent multiple instances of Prisma Client in development
declare const global: CustomNodeJsGlobal;
const prisma = global.prisma | new PrismaClient();
if (process.env.NODE_ENV === 'development') global.prisma = prisma;
export default prisma;
