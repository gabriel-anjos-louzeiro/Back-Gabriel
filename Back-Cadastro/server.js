const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors()); // Habilita CORS

// Configuração do banco de dados
const db = mysql.createConnection({
    host: '186.202.152.117',
    user: 'sistemaelmo',
    password: 'Elmo#2008@',
    database: 'sistemaelmo'
});

// Conectar ao banco de dados
db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.stack);
        return;
    }
    console.log('Conectado ao banco de dados MySQL como ID ' + db.threadId);
});

// Função para obter o próximo ID
const getNextId = (callback) => {
    db.query('SELECT MAX(id) AS maxId FROM Usuarios', (err, results) => {
        if (err) {
            return callback(err, null);
        }
        const nextId = (results[0].maxId || 0) + 1;
        callback(null, nextId);
    });
};

// Rota para registrar um novo usuário
app.post('/register', (req, res) => {
    const { email, senha } = req.body;

    // Verificar se o usuário já existe
    db.query('SELECT * FROM Usuarios WHERE email = ?', [email], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.length > 0) {
            return res.status(400).json({ message: 'Usuário já existe.' });
        }

        // Obter o próximo ID
        getNextId((err, nextId) => {
            if (err) {
                return res.status(500).send(err);
            }

            // Inserir novo usuário com a senha em texto claro
            db.query('INSERT INTO Usuarios (id, email, senha) VALUES (?, ?, ?)', [nextId, email, senha], (err, results) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.status(201).json({ id: nextId, email });
            });
        });
    });
});

// Rota para autenticar um usuário
app.post('/login', (req, res) => {
    const { email, senha } = req.body;

    // Verificar se o usuário existe
    db.query('SELECT * FROM Usuarios WHERE email = ?', [email], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.length === 0) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        const user = results[0];
        // Verificar a senha (comparação em texto claro)
        if (senha !== user.senha) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        res.json({ message: 'Login bem-sucedido!', user });
    });
});

// Iniciar o servidor
const PORT = process.env.PORT || 5001; // Alterado para a porta 5000
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
