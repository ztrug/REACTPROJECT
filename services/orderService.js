import { create } from '../repositories/orderRepository.js'

export async function createOrder(data) {
  if (!data.userId || !data.item) throw new Error('Pedido inválido')
  return await create(data)
}
import { findByUserId } from '../repositories/orderRepository.js'

export async function getOrdersByUserId(userId) {
  return await findByUserId(userId)
}
