import { PrismaClient } from "@prisma/client"
import "dotenv/config"

// Extend the global object with PrismaClient
declare global {
  var prisma: PrismaClient | undefined
}

// Prevent multiple instances of Prisma Client in development
const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") global.prisma = prisma

export default prisma