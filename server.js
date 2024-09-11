const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Usar o arquivo da tela de login
app.use(express.static(path.join(__dirname, '../FrontEnd-System')));

// Servir o arquivo index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../FrontEnd-System', 'index.html'));
});

// Rotas de usuários e módulos
const usuariosRoutes = require('./Routes/usuarios routes/login');
app.use('/api', usuariosRoutes); // Rota do acesso de login

const modulosRoutes = require('./Routes/usuarios routes/modulos');
app.use('/api', modulosRoutes); // Rota do acesso de login nos módulos

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
