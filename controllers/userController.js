// Corrige os imports (caminho relativo)
import {
  createUser,
  getUsers,
  updateUser,
  deleteUser
} from '../services/userService.js' // ✅

export async function handleCreateUser(req, res) {
  try {
    // Validação
    if (!req.body.nome || !req.body.email || !req.body.senha) {
      return res.status(400).json({ erro: "Nome, email e senha são obrigatórios!" })
    }

    const user = await createUser(req.body)
    const { senha: _, ...userSafe } = user // Remove senha do response
    res.status(201).json(userSafe)

  } catch (error) {
    // Erros específicos do Prisma (ex: email duplicado)
    if (error.code === 'P2002') {
      return res.status(409).json({ erro: "Email já cadastrado!" })
    }
    res.status(500).json({ erro: error.message })
  }
}

// (Mantenha os outros métodos como estão, mas adicione validações similares)
export async function handleGetUsers(req, res) {
  try {
    const users = await getUsers(req.query)
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ erro: error.message })
  }
}

export async function handleUpdateUser(req, res) {
  try {
    const user = await updateUser(Number(req.params.id), req.body)
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ erro: error.message })
  }
}

export async function handleDeleteUser(req, res) {
  try {
    await deleteUser(Number(req.params.id))
    res.status(200).json({ message: 'Usuário deletado com sucesso!' })
  } catch (error) {
    res.status(500).json({ erro: error.message })
  }
}
