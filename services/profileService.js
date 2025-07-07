import { create } from '../repositories/profileRepository.js'

export async function createProfile(data) {
  if (!data.userId || !data.bio) throw new Error('Dados incompletos')
  return await create(data)
}
