require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = process.env.PORT || 3000;

// Crie a conexão com o banco de dados
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'sistemaelmo'
});

// Teste a conexão ao iniciar o servidor
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    process.exit(1); // Sai do processo com um código de erro
  }
  console.log('Conectado ao banco de dados com sucesso!');
});

// Rota de teste
app.get('/', (req, res) => {
  res.send('Servidor funcionando e banco de dados conectado!');
});

// Inicie o servidor
app.listen(port, () => {
  console.log(`Servidor ouvindo na porta ${port}`);
});

// Feche a conexão com o banco de dados quando o servidor for encerrado
process.on('SIGINT', () => {
  connection.end((err) => {
    if (err) {
      console.error('Erro ao fechar a conexão com o banco de dados:', err);
    } else {
      console.log('Conexão com o banco de dados fechada.');
    }
    process.exit(0);
  });
});
