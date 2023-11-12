// Espera o carregamento completo do DOM para garantir que todos os elementos estejam disponíveis
document.addEventListener('DOMContentLoaded', function () {
  // Seleciona o elemento Mario no DOM
  const mario = document.querySelector('.mario');
  // Seleciona o elemento Pipe no DOM
  const pipe = document.querySelector('.pipe');
  // Seleciona o elemento Score no DOM
  const score = document.querySelector('.score--value');

  // Função para fazer o Mario pular
  const jump = () => {
      // Adiciona a classe 'jump' para animar o salto
      mario.classList.add('jump');

      // Aguarda um curto período de tempo e remove a classe 'jump'
      setTimeout(() => {
          mario.classList.remove('jump');
      }, 500);
  };

  // Define um intervalo de tempo para verificar colisões e atualizar o estado do jogo
  const loop = setInterval(() => {
      console.log('Loop');

      // Obtém a posição atual do cano e do Mario
      const pipePosition = pipe.offsetLeft;
      const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

      console.log(marioPosition);

      // Verifica se houve uma colisão entre o Mario e o cano
      if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
          // Remove a animação do cano e ajusta sua posição
          pipe.style.animation = 'none';
          pipe.style.left = `${pipePosition}px`;

          // Remove a animação do Mario e ajusta sua posição
          mario.style.animation = 'none';
          mario.style.bottom = `${marioPosition}px`;

          // Atualiza a imagem e estilo do Mario para indicar o fim do jogo
          mario.src = './Imagens/game-over.png';
          mario.style.width = '75px';
          mario.style.marginLeft = '50px';

          // Limpa o intervalo para interromper o loop do jogo
          clearInterval(loop);

          // Exibe o menu de game over
          menu.style.display = 'flex';
      }
  }, 10);

  // Adiciona um ouvinte de evento para a tecla de seta para cima, acionando a função de pulo
  document.addEventListener('keydown', jump);
});
