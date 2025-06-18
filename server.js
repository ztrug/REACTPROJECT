import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const PORT = 3100; // Ou a porta que preferir
app.use(express.json())


const server = app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`⚠️  A porta ${PORT} já está em uso!`);
    console.log('Tente:');
    console.log(`1. Mudar a porta no server.js (ex: 3000)`);
    console.log(`2. Executar: kill -9 $(lsof -t -i:${PORT}) (Linux/Mac)`);
    console.log(`3. Reiniciar seu computador`);
  } else {
    console.error('Erro no servidor:', err);
  }
});


app.post('/usuarios', async (req, res) => {
  try {
    const novoUser = await prisma.user.create({
      data: {
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
      }
    });
    res.status(201).json(novoUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao criar usuário.' });
  }
});



app.get('/usuarios',async (req, res)=> {

    let users = []

  if(req.query){
    users = await prisma.user.findMany({
      where: {
        name: req.query.name, 
        email: req.query.email,
        senha: req.query.senha

      }
    })
  }else{
    users = await prisma.user.findMany()
    }
 
  console.log(req)
  
  res.status(200).json(users)
})


app.put('/usuarios/:id', async (req, res) => {
  const { email, nome, senha } = req.body;

  if (!email || !nome || !senha) {
    return res.status(400).json({ erro: 'Campos email, nome e senha são obrigatórios.' });
  }

  try {
    const usuarioAtualizado = await prisma.user.update({
      where: {
        id: Number(req.params.id)
      },
      data: {
        email,
        nome,
        senha
      }
    });

    res.status(200).json(usuarioAtualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao atualizar usuário.' });
  }
});


app.delete('/usuarios/:id', async (req, res ) => {
    await prisma.user.delete({ 
      where: {
        id: Number(req.params.id)
      }
    })
    res.status(200).json({message:"Usuario deletado com sucesso!"})
})  
/*
Criar API USUARIOS
Lista
Editar
Deletar
*/












