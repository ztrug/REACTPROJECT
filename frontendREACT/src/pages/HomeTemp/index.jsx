import './style.css'
import Lixo from '../../assets/3096673.png'
function Home() {

  const users = [
    {
      id: '23',
      name: 'Fabio',
      email: 'fabiohsde@gmail.com',
      senha: 'wasd'
    },
    {
      id: '24',
      name: 'Fabioo',
      email: 'ztrug@gmail.com',
      senha: 'dsaw'
    },
  ]
  return (
    <div className='container'>
      <form>
        <h1>Cadastro de usuarios</h1>
        <input placeholder="Nome" nome='nome' type='text'> </input>
        <input placeholder="Email" email='email' type='email'> </input>
        <input placeholder="Senha" senha='senha' type='password'> </input>
        <button type='button'>Cadastrar</button>
      </form>


      {users.map(user => (
        <div key={user.id} className='card'>
          <div>
            <p>Nome: <span>{user.nome}</span></p>
            <p>Email: <span>{user.email}</span></p>
            <p>Senha: <span>{user.senha}</span></p>
          </div>
          <button>
            <img src={Lixo} />
          </button>
        </div >

      ))
      }
    </div >


  )
}

export default Home
