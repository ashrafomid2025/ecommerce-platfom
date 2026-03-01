import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };
const adapter = new PrismaPg({
  connectionString:
    "postgresql://neondb_owner:npg_d2JiKah3TeYL@ep-broad-brook-a1q4k84l-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&uselibpqcompat=true&channel_binding=require",
});
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter: adapter,
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
