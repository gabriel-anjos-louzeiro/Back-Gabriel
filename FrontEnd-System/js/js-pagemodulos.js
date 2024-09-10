// Seleciona todos os módulos
const modulos = document.querySelectorAll('.modulo');
// Seleciona a modal e seus elementos
const modal = document.getElementById('loginModal');
const closeModalBtn = document.querySelector('.close-btn');
const loginForm = document.getElementById('loginForm');

// Adiciona evento de clique em cada módulo para abrir a modal
modulos.forEach(modulo => {
  modulo.addEventListener('click', () => {
    // Exibe a modal
    modal.style.display = 'block';
    // Armazena qual módulo foi clicado (opcional)
    const moduloNome = modulo.querySelector('span').textContent;
    loginForm.setAttribute('data-modulo', moduloNome); // Aqui você pode capturar o nome do módulo
  });
});

// Fecha a modal quando o botão de fechar é clicado
closeModalBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Fecha a modal quando o usuário clica fora do conteúdo da modal
window.addEventListener('click', event => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

// Evento de submissão do formulário de login
loginForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Previne o comportamento padrão do formulário

  // Pega os valores dos campos de usuário e senha
  const user = document.getElementById('usermod').value;
  const password = document.getElementById('passwordmod').value;

  try {
    // Envia a requisição para a rota de login dos módulos
    const response = await fetch('/api/loginmodulos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user, password }) // Envia os dados de login
    });

    const data = await response.json(); // Converte a resposta para JSON

    if (data.success) {
      alert('Login bem-sucedido no módulo!');
      modal.style.display = 'none'; // Fechar a modal após sucesso no login
    } else {
      alert('Usuário ou senha incorretos. Tente novamente.');
    }
  } catch (error) {
    console.error('Erro ao tentar fazer login no módulo:', error);
    alert('Erro ao tentar fazer login no módulo. Tente novamente mais tarde.');
  }
});
