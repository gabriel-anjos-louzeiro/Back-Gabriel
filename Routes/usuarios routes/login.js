
//ROTA PARA FAZER LOGIN DE USUARIOS

const express = require('express');
const router = express.Router();
const connection = require('../../bdconexão js/conexão');


// Rota de login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Verificar o usuário no banco de dados
    connection.query(
      'SELECT * FROM Usuarios WHERE email = ? AND senha = ?',
      [email, password],
      (error, results) => {

        if (error) {
          console.error('Erro ao fazer login', error);
          return res.status(500).json({ success: false, message: 'Erro ao tentar fazer login' });
        }

        if (results.length > 0) {
          // Usuário encontrado
          res.json({ success: true });
        } else {
          // Usuário não encontrado
          res.status(401).json({ success: false, message: 'Email ou senha incorreta' });
        }
      }
    );
  } catch (error) {

    console.error('Erro ao fazer login', error);
    res.status(500).json({ success: false, message: 'Erro ao tentar fazer login' });

  }
});

module.exports = router;
