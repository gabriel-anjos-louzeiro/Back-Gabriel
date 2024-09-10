async function logar(event) {
  event.preventDefault(); // Previne o comportamento padrão do formulário

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    
    if (data.success) {
      window.location.href = './modulos.html';
    } else {
      alert('Email ou senha inválidos');
    }
  } catch (error) {
    console.error('Erro ao fazer login', error);
    alert('Erro ao tentar fazer login');
  }
}

// Adiciona o event listener ao formulário
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');
  form.addEventListener('submit', logar);
});




