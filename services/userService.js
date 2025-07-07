import {
  create,
  findAll,
  update,
  remove
} from '../repositories/userRepository.js'

export async function createUser(data) {
  return await create(data)
}

export async function getUsers(filters) {
  return await findAll(filters)
}

export async function updateUser(id, data) {
  return await update(id, data)
}

export async function deleteUser(id) {
  return await remove(id)
}
