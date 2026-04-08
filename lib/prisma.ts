import { PrismaClient } from '../app/generated/prisma'
import { withAccelerate } from '@prisma/extension-accelerate'

const globalForPrisma = global as unknown as {
    prisma: ReturnType<typeof createPrismaClient>
}

function createPrismaClient() {
    const url = process.env.DATABASE_URL
    if (!url) {
        throw new Error('DATABASE_URL is not defined')
    }
    return new PrismaClient({
        datasources: {
            db: { url },
        },
    }).$extends(withAccelerate())
}

const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma