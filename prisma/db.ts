import { PrismaClient } from "@prisma/client";

// Explicitly define "global" for prisma client instance

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// Using different log levels depending on running env

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
	globalForPrisma.prisma = prisma;
}

// {
// 	log:
// 		process.env.NODE_ENV === "development"
// 			? ["query", "error", "warn"]
// 			: ["error", "warn"],
// }
