//ROTA PARA FAZER LOGIN DO TELA DE MODULOS

const express = require('express');
const router = express.Router();
const connection = require('../../bdconexão js/conexão');

// Rota de login
router.post('/loginmodulos', async (req, res) => {
  const { user, password } = req.body;
  try {
    // Verificar o usuário no banco de dados
    connection.query(
      'SELECT * FROM Usuarios WHERE log_modulos = ? AND sen_modulos = ?',
      [user, password],
      (error, results) => {

        if (error) {
          console.error('Erro ao fazer login', error);
          return res.status(500).json({ success: false, message: 'Erro ao tentar fazer login' });
        }

        if (results.length > 0) {
          // Usuário encontrado
          res.json({ success: true, message: 'Login bem-sucedido' });
        } else {
          // Usuário não encontrado
          res.status(401).json({ success: false, message: 'Usuário ou senha incorreta' });
        }
        
      }
    );
  } catch (error) {

    console.error('Erro ao fazer login', error);
    res.status(500).json({ success: false, message: 'Erro ao tentar fazer login' });

  }
});

module.exports = router;