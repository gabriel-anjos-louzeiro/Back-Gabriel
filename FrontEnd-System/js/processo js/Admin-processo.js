// Aguarda até que todo o conteúdo do DOM esteja carregado antes de executar o código.

document.addEventListener('DOMContentLoaded', function() {

  const selectElement = document.getElementById('selectprocessos'); // Obtém o elemento <select> com o ID 'selectprocessos' e o armazena na constante 'selectElement'.
  const sections = document.querySelectorAll('.process-section');// Seleciona todas as seções com a classe 'process-section' e as armazena na constante 'sections'.
  
  selectElement.addEventListener('change', function() {// Adiciona um ouvinte de evento 'change' ao elemento <select> que será acionado quando o valor selecionado for alterado.
    const selectedValue = this.value;// Armazena o valor do item selecionado no <select> na constante 'selectedValue'.
    
    sections.forEach(section => { // Itera por cada elemento da NodeList 'sections'.
      if (section.id === selectedValue) {  // Verifica se o ID da seção corresponde ao valor selecionado.   
        section.style.display = 'block';// Se corresponder, define a exibição da seção como 'block' (visível).
      } else {
        section.style.display = 'none'; // Caso contrário, define a exibição da seção como 'none' (oculta).
      }
    });
  });
});
