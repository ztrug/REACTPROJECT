import { createOrder } from '../services/orderService.js'

export async function handleCreateOrder(req, res) {
  const { userId, item } = req.body
  try {
    const order = await createOrder({ userId, item })
    res.status(201).json(order)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}
import { getOrdersByUserId } from '../services/orderService.js'

export async function handleGetOrdersByUser(req, res) {
  const userId = parseInt(req.params.id)
  try {
    const orders = await getOrdersByUserId(userId)
    res.json(orders)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}
