// Tamanho do tabuleiro
const boardSize = 15;


// Elemento do tabuleiro
const board = document.getElementById('board');


// Elementos do placar para os jogadores preto e branco
const blackScoreElement = document.getElementById('blackScore');
const whiteScoreElement = document.getElementById('whiteScore');


// Variáveis para controlar o jogador atual e os pontos
let currentPlayer = 'black';
let blackScore = 0;
let whiteScore = 0;


// Criação do tabuleiro
for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.row = i;
        cell.dataset.col = j;
        board.appendChild(cell);
    }
}


// Adiciona evento de clique às células
const cells = document.querySelectorAll('.cell');
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});


// Função para lidar com o clique em uma célula
function handleCellClick(event) {
    const clickedCell = event.target;


    // Verifica se a célula já foi marcada
    if (!clickedCell.textContent) {
        // Adiciona marcação ao jogador atual
        clickedCell.textContent = currentPlayer === 'black' ? '●' : '○';
        clickedCell.classList.add(currentPlayer);


        // Verifica se há um vencedor
        if (checkWin(clickedCell)) {
            // Atualiza o placar e exibe a mensagem de vitória
            updateScore();
            alert(`${currentPlayer === 'black' ? 'Rosa' : 'Roxo'} ganhou!`);
           
            // Reinicia o tabuleiro
            resetBoard();
        } else {
            // Alterna para o próximo jogador
            currentPlayer = currentPlayer === 'black' ? 'white' : 'black';
        }
    }
}


// Função para atualizar o placar
function updateScore() {
    if (currentPlayer === 'black') {
        blackScore += 10;
        blackScoreElement.textContent = blackScore;
    } else {
        whiteScore += 10;
        whiteScoreElement.textContent = whiteScore;
    }
}


// Função para verificar se há um vencedor
function checkWin(cell) {
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    return (
        checkDirection(row, col, 1, 0) || // horizontal
        checkDirection(row, col, 0, 1) || // vertical
        checkDirection(row, col, 1, 1) || // diagonal /
        checkDirection(row, col, 1, -1)   // diagonal \
    );
}


// Função para verificar a direção de uma possível sequência vencedora
function checkDirection(row, col, rowDir, colDir) {
    const color = currentPlayer === 'black' ? 'black' : 'white';
    let count = 1;
    let r, c;


    // Verifica em uma direção
    r = row + rowDir;
    c = col + colDir;
    while (r >= 0 && r < boardSize && c >= 0 && c < boardSize && document.querySelector(`[data-row="${r}"][data-col="${c}"]`).classList.contains(color)) {
        count++;
        r += rowDir;
        c += colDir;
    }


    // Verifica na direção oposta
    r = row - rowDir;
    c = col - colDir;
    while (r >= 0 && r < boardSize && c >= 0 && c < boardSize && document.querySelector(`[data-row="${r}"][data-col="${c}"]`).classList.contains(color)) {
        count++;
        r -= rowDir;
        c -= colDir;
    }


    // Retorna verdadeiro se houver uma sequência de pelo menos 5
    return count >= 5;
}


// Função para reiniciar o tabuleiro
function resetBoard() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('black', 'white');
    });
    currentPlayer = 'black';
}