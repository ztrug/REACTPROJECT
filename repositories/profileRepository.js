import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function create(data) {
  return await prisma.profile.create({ data })
}
