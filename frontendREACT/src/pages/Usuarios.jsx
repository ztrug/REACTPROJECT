import { useEffect, useState, useRef } from 'react'
import Lixo from '../assets/3096673.png'
import api from '../services/api'
import './usuarios.css'

function Home() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const inputName = useRef()
  const inputEmail = useRef()
  const inputSenha = useRef()

  async function getUsers() {
    try {
      setLoading(true)
      const response = await api.get('/usuarios')
      setUsers(response.data)
    } catch (err) {
      setError('Erro ao carregar usuários')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function createUsers() {
    if (!inputName.current.value || !inputEmail.current.value || !inputSenha.current.value) {
      setError('Preencha todos os campos')
      return
    }

    try {
      setLoading(true)
      await api.post('/usuarios', {
        nome: inputName.current.value,
        email: inputEmail.current.value,
        senha: inputSenha.current.value
      })
      
      // Limpa os campos após cadastro
      inputName.current.value = ''
      inputEmail.current.value = ''
      inputSenha.current.value = ''
      setError(null)
      getUsers()
    } catch (err) {
      setError(err.response?.data?.erro || 'Erro ao cadastrar usuário')
    } finally {
      setLoading(false)
    }
  }

  async function deleteUsers(id) {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      try {
        await api.delete(`/usuarios/${id}`)
        getUsers()
      } catch (err) {
        setError('Erro ao excluir usuário')
      }
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className='container'>
      <form>
        <h1>Cadastro de usuários</h1>
        
        {error && <p className="error-message">{error}</p>}
        
        <input 
          placeholder="Nome" 
          type='text' 
          ref={inputName} 
          disabled={loading}
        />
        <input 
          placeholder="Email" 
          type='email' 
          ref={inputEmail} 
          disabled={loading}
        />
        <input 
          placeholder="Senha" 
          type='password' 
          ref={inputSenha} 
          disabled={loading}
        />
        <button 
          type='button' 
          onClick={createUsers}
          disabled={loading}
        >
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>

      {loading ? (
        <p>Carregando usuários...</p>
      ) : (
        users.map(user => (
          <div key={user.id} className='card'>
            <div>
              <p><strong>ID:</strong> <span>{user.id}</span></p>
              <p><strong>Nome:</strong> <span>{user.nome}</span></p>
              <p><strong>Email:</strong> <span>{user.email}</span></p>
              {/* Removida a exibição da senha por segurança */}
            </div>
            <button 
              onClick={() => deleteUsers(user.id)}
              disabled={loading}
            >
              <img src={Lixo} alt="Excluir usuário" />
            </button>
          </div>
        ))
      )}
    </div>
  )
}

export default Home