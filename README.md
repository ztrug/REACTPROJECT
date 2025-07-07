README.md (Salve como README.md na raiz do projeto)
markdown
# 🚀 Sistema de Pedidos (React + API)

Um sistema para cadastro de usuários, login e gestão de pedidos, onde cada usuário pode:
- **Cadastrar-se** e fazer **login**.
- **Criar pedidos** e **visualizar seus pedidos** pelo ID do usuário.

## 🔧 Tecnologias Usadas
- **Frontend**: React.js, CSS
- **Backend**: Node.js (API)
- **Banco de Dados**: Prisma (SQL)

## ⚙️ Como Executar o Projeto

### Pré-requisitos
- Node.js (v18+)
- npm ou yarn
- Banco de dados configurado (ex: PostgreSQL)

### Passos para Iniciar
1. **Clone o repositório**:
   ```bash
   git clone https://github.com/seu-usuario/seu-projeto.git
Instale as dependências:

bash
cd frontendREACT
npm install
cd ../api
npm install
Configure o banco de dados:

Crie um arquivo .env baseado no .env.example e preencha as credenciais do DB.

Rode as migrations:

bash
npx prisma migrate dev
Inicie os servidores:

Backend (API):

bash
cd api
npm run dev
Frontend (React):

bash
cd frontendREACT
npm run dev
📌 Funcionalidades
✅ Cadastro de Usuário
✅ Login com Autenticação
✅ Criação de Pedidos
✅ Busca de Pedidos por ID do Usuário

📂 Estrutura do Projeto
text
/projeto
├── /frontendREACT       # Aplicação React
├── /api                 # Backend (Node.js + Prisma)
├── README.md            # Este arquivo
└── .gitignore
🤝 Contribuição
Contribuições são bem-vindas! Abra uma issue ou envie um PR.

text

---

## 🖥️ **Estrutura Básica do Site (React)**  
Seu frontend (`frontendREACT/src`) pode seguir esta organização:  

### 1. **Páginas Principais**  
- **`Login.jsx`** (Autenticação)  
- **`Register.jsx`** (Cadastro de usuário)  
- **`Pedido.jsx`** (Criar/buscar pedidos)  
- **`Perfil.jsx`** (Dados do usuário)  

### 2. **Exemplo de Código para `Pedido.jsx`**  
```jsx
import { useState } from 'react';
import api from '../services/api';

export default function Pedido() {
  const [pedidos, setPedidos] = useState([]);
  const [userId, setUserId] = useState('');

  const buscarPedidos = async () => {
    try {
      const response = await api.get(`/pedidos?userId=${userId}`);
      setPedidos(response.data);
    } catch (error) {
      alert("Erro ao buscar pedidos!");
    }
  };

  return (
    <div>
      <h1>Meus Pedidos</h1>
      <input
        type="text"
        placeholder="Digite seu ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button onClick={buscarPedidos}>Buscar</button>

      <ul>
        {pedidos.map((pedido) => (
          <li key={pedido.id}>{pedido.descricao}</li>
        ))}
      </ul>
    </div>
  );
}
3. Serviço de API (services/api.js)
javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // URL do seu backend
});

export default api;
🛠️ Backend (Exemplo de Rota para Pedidos)
No seu backend (Node.js + Prisma), crie uma rota para buscar pedidos por ID do usuário:

javascript
// api/src/routes/pedidos.js
import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

router.get('/', async (req, res) => {
  const { userId } = req.query;
  const pedidos = await prisma.pedido.findMany({
    where: { userId: parseInt(userId) },
  });
  res.json(pedidos);
});

export default router;