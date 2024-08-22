const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
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

// Rota para registrar um novo usuário
app.post('/register', async (req, res) => {
    const { email, senha } = req.body;

    // Verificar se o usuário já existe
    db.query('SELECT * FROM Usuarios WHERE email = ?', [email], async (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.length > 0) {
            return res.status(400).json({ message: 'Usuário já existe.' });
        }

        // Hash da senha
        const hashedPassword = await bcrypt.hash(senha, 10);

        // Inserir novo usuário
        db.query('INSERT INTO Usuarios (email, senha) VALUES (?, ?)', [email, hashedPassword], (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(201).json({ id: results.insertId, email });
        });
    });
});

// Rota para autenticar um usuário
app.post('/login', (req, res) => {
    const { email, senha } = req.body;

    // Verificar se o usuário existe
    db.query('SELECT * FROM Usuarios WHERE email = ?', [email], async (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.length === 0) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        const user = results[0];
        // Verificar a senha
        const match = await bcrypt.compare(senha, user.senha);
        if (!match) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        res.json({ message: 'Login bem-sucedido!', user });
    });
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
