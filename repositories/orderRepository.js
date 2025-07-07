import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function create(data) {
  return await prisma.order.create({ data })
}
export async function findByUserId(userId) {
  return await prisma.order.findMany({
    where: { userId }
  })
}
