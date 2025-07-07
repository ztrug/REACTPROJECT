import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
// Teste de conexão (opcional)
prisma.$connect().catch(console.error)
// Controllers
import {
  handleCreateUser,
  handleGetUsers,
  handleUpdateUser,
  handleDeleteUser
} from './controllers/userController.js'

import { handleCreateProfile } from './controllers/profileController.js'
import {
  handleCreateOrder,
  handleGetOrdersByUser
} from './controllers/orderController.js'

const app = express()
const PORT = 3100

app.use(cors())
app.use(express.json())

// Rotas de usuário
app.post('/usuarios', handleCreateUser)
app.get('/usuarios', handleGetUsers)
app.put('/usuarios/:id', handleUpdateUser)
app.delete('/usuarios/:id', handleDeleteUser)

// Rotas de perfil (altere para usar :userId)
app.post('/usuarios/:userId/profile', handleCreateProfile) // POST /usuarios/1/profile

// Rotas de pedidos (corrija o path)
app.post('/usuarios/:userId/orders', handleCreateOrder) // POST /usuarios/1/orders
app.get('/usuarios/:userId/orders', handleGetOrdersByUser)

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`)
})
prisma.$connect()
  .then(() => console.log("✅ Conectado ao banco de dados"))
  .catch(err => console.error("❌ Erro de conexão:", err))