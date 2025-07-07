import { createProfile } from '../services/profileService.js'

export async function handleCreateProfile(req, res) {
  try {
    const { userId } = req.params // ← Agora vem da URL
    const profile = await createProfile({
      ...req.body,
      userId: Number(userId) // Relacionamento obrigatório
    })
    res.status(201).json(profile)
  } catch (error) {
    if (error.code === 'P2003') {
      return res.status(404).json({ erro: "Usuário não encontrado!" })
    }
    res.status(500).json({ erro: error.message })
  }
}