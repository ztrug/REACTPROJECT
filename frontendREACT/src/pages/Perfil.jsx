import { useState } from 'react'

function Perfil() {
  const [userId, setUserId] = useState('')
  const [bio, setBio] = useState('')

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch(`http://localhost:3100/usuarios/${userId}/profile`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bio }) // Removido userId do body
    });

    if (!response.ok) throw new Error('Falha ao criar perfil');
    
    alert('Perfil cadastrado com sucesso!');
    setBio('');
  } catch (err) {
    alert(`Erro: ${err.message}`);
    console.error(err);
  }
}
  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="number"
        placeholder="ID do Usuário"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Senha"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        required
      />
      <button type="submit">Efetuar Login</button>
    </form>
  )
}

export default Perfil
