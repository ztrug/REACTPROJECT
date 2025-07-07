import { useState, useEffect } from 'react'
import './usuarios.css' // Reutilize o mesmo CSS para consistência

function Pedido() {
  const [users, setUsers] = useState([]) // Lista de usuários
  const [selectedUserId, setSelectedUserId] = useState('')
  const [descricao, setDescricao] = useState('')
  const [pedidos, setPedidos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Busca usuários ao carregar o componente
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('http://localhost:3100/usuarios')
        const data = await res.json()
        setUsers(data)
      } catch (err) {
        setError('Erro ao carregar usuários')
        console.error(err)
      }
    }
    fetchUsers()
  }, [])

  const buscarPedidos = async (id) => {
    try {
      setLoading(true)
      const res = await fetch(`http://localhost:3100/usuarios/${id}/orders`)
      if (!res.ok) throw new Error('Falha ao buscar pedidos')
      const data = await res.json()
      setPedidos(data)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!selectedUserId) {
      setError('Selecione um usuário')
      return
    }

    try {
      setLoading(true)
      const response = await fetch(
        `http://localhost:3100/usuarios/${selectedUserId}/orders`, // Corrigido o endpoint
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            item: descricao,
            userId: parseInt(selectedUserId)  // ✅ Adicionado corretamente
          }) // Removido userId do body
        }
      )

      if (!response.ok) throw new Error('Falha ao criar pedido')

      alert('Pedido cadastrado com sucesso!')
      setDescricao('')
      setError(null)
      if (selectedUserId) {
        await buscarPedidos(selectedUserId)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h2>Cadastrar Pedido</h2>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="form">
        <select
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
          required
          disabled={loading}
        >
          <option value="">Selecione um usuário</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.nome} (ID: {user.id})
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Descrição do Pedido"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
          disabled={loading}
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Processando...' : 'Cadastrar Pedido'}
        </button>
      </form>

      <hr />

      <h2>Pedidos Cadastrados</h2>
      <button
        onClick={() => buscarPedidos(selectedUserId)}
        disabled={!selectedUserId || loading}
      >
        Buscar Pedidos
      </button>

      {loading ? (
        <p>Carregando...</p>
      ) : pedidos.length > 0 ? (
        <ul className="pedidos-list">
          {pedidos.map((pedido) => (
            <li key={pedido.id} className="pedido-item">
              <strong>ID:</strong> {pedido.id} | <strong>Item:</strong> {pedido.item}
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum pedido encontrado.</p>
      )}
    </div>
  )
}

export default Pedido