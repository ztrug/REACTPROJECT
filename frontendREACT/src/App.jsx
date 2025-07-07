import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Usuarios from './pages/Usuarios'
import Perfil from './pages/Perfil'
import Pedido from './pages/Pedido'

function App() {
  return (
    <BrowserRouter>
      <nav style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
        <a href="/usuarios">Usuários</a>
        <a href="/perfil">Perfil</a>
        <a href="/pedido">Pedido</a>
      </nav>
      <Routes>
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/pedido" element={<Pedido />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
