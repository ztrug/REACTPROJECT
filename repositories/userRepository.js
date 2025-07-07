import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function create(data) {
  return await prisma.user.create({ 
    data: {
      nome: data.nome,
      email: data.email,
      senha: data.senha
    }
  })
}

export async function findAll(filters) {
  const { nome, email } = filters // Removi 'senha' por segurança
  return await prisma.user.findMany({
    where: {
      ...(nome && { nome }), // Campo corrigido para "nome"
      ...(email && { email })
    }
  })
}

export async function update(id, data) {
  return await prisma.user.update({
    where: { id },
    data: {
      nome: data.nome,   // ← Campo corrigido
      email: data.email,
      senha: data.senha  // ← Campo corrigido
    }
  })
}

export async function remove(id) {
  return await prisma.user.delete({ where: { id } })
}