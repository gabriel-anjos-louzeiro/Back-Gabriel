const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
app.use(express.json());

// Configuração do banco de dados
const db = mysql.createConnection({
    host: '186.202.152.117',
    user: 'sistemaelmo',
    password: 'Elmo#2008@',
    database: 'sistemaelmo'  // Certifique-se de que o nome do banco de dados esteja correto
});

// Conectar ao banco de dados
db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.stack);
        return;
    }
    console.log('Conectado ao banco de dados MySQL como ID ' + db.threadId);
});

// Rota para obter todos os usuários
app.get('/Login', (req, res) => {
    db.query('SELECT * FROM Usuarios', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Rota para obter um usuário por ID
app.get('/Login/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM Usuarios WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results[0]);
    });
});

// Rota para adicionar um novo usuário
app.post('/Login', (req, res) => {
    const { email, senha } = req.body;
    db.query('INSERT INTO Usuarios (email, senha) VALUES (?, ?)', [email, senha], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).json({ id: results.insertId, email, senha });
    });
});

// Rota para atualizar um usuário existente
app.put('/Login/:id', (req, res) => {
    const { id } = req.params;
    const { email, senha } = req.body;
    db.query('UPDATE Usuarios SET email = ?, senha = ? WHERE id = ?', [email, senha, id], (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ id, email, senha });
    });
});

// Rota para deletar um usuário
app.delete('/Login/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM Usuarios WHERE id = ?', [id], (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(204).send();
    });
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
