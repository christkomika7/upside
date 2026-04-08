import { PrismaClient } from '../app/generated/prisma'
import { withAccelerate } from '@prisma/extension-accelerate'

const globalForPrisma = global as unknown as {
    prisma: ReturnType<typeof createPrismaClient>
}

function createPrismaClient() {
    return new PrismaClient({
        datasources: {
            db: {
                url: process.env.DATABASE_URL!,
            },
        },
    }).$extends(withAccelerate())
}

const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma