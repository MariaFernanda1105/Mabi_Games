// Seletores para elementos DOM importantes
const selectors = {
    boardContainer: document.querySelector('.board-container'),
    board: document.querySelector('.board'),
    moves: document.querySelector('.moves'),
    timer: document.querySelector('.timer'),
    start: document.querySelector('button'),
    win: document.querySelector('.win')
}

// Estado do jogo
const state = {
    gameStarted: false,
    flippedCards: 0,
    totalFlips: 0,
    totalTime: 0,
    loop: null
}

// Função para embaralhar um array
const shuffle = array => {
    // Implementação do algoritmo de Fisher-Yates para embaralhar
    const clonedArray = [...array]

    for (let i = clonedArray.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1))
        const original = clonedArray[i]

        clonedArray[i] = clonedArray[randomIndex]
        clonedArray[randomIndex] = original
    }

    return clonedArray
}

// Função para escolher aleatoriamente itens de um array
const pickRandom = (array, items) => {
    const clonedArray = [...array]
    const randomPicks = []

    for (let i = 0; i < items; i++) {
        const randomIndex = Math.floor(Math.random() * clonedArray.length)
        
        randomPicks.push(clonedArray[randomIndex])
        clonedArray.splice(randomIndex, 1)
    }

    return randomPicks
}

// Função para gerar o tabuleiro do jogo
const generateGame = () => {
    const dimensions = selectors.board.getAttribute('data-dimension')  

    // Verifica se as dimensões do tabuleiro são pares
    if (dimensions % 2 !== 0) {
        throw new Error("A dimensão do tabuleiro deve ser um número par.")
    }

    // Lista de emojis para o jogo
    const emojis = ['🥔', '🍒', '🥑', '🌽', '🥕', '🍇', '🍉', '🍌', '🥭', '🍍']
    
    // Escolhe aleatoriamente emojis para as cartas e as embaralha
    const picks = pickRandom(emojis, (dimensions * dimensions) / 2) 
    const items = shuffle([...picks, ...picks])

    // Gera a representação HTML do tabuleiro
    const cards = `
        <div class="board" style="grid-template-columns: repeat(${dimensions}, auto)">
            ${items.map(item => `
                <div class="card">
                    <div class="card-front"></div>
                    <div class="card-back">${item}</div>
                </div>
            `).join('')}
       </div>
    `
    
    // Converte a representação HTML em um objeto DOM
    const parser = new DOMParser().parseFromString(cards, 'text/html')

    // Substitui o tabuleiro existente pelo novo tabuleiro gerado
    selectors.board.replaceWith(parser.querySelector('.board'))
}

// Função para iniciar o jogo
const startGame = () => {
    state.gameStarted = true
    selectors.start.classList.add('disabled')

    // Inicia um loop para atualizar o tempo e o número de movimentos
    state.loop = setInterval(() => {
        state.totalTime++
        selectors.moves.innerText = `${state.totalFlips} movimentos`
        selectors.timer.innerText = `Tempo: ${state.totalTime} seg`
    }, 1000)
}

// Função para desvirar cartas que não formam um par
const flipBackCards = () => {
    document.querySelectorAll('.card:not(.matched)').forEach(card => {
        card.classList.remove('flipped')
    })

    state.flippedCards = 0
}

// Função para virar uma carta
const flipCard = card => {
    state.flippedCards++
    state.totalFlips++

    // Inicia o jogo se ainda não tiver começado
    if (!state.gameStarted) {
        startGame()
    }

    // Vira a carta se ainda não houver duas cartas viradas
    if (state.flippedCards <= 2) {
        card.classList.add('flipped')
    }

    // Verifica se duas cartas estão viradas
    if (state.flippedCards === 2) {
        const flippedCards = document.querySelectorAll('.flipped:not(.matched)')

        // Verifica se as duas cartas viradas formam um par
        if (flippedCards[0].innerText === flippedCards[1].innerText) {
            flippedCards[0].classList.add('matched')
            flippedCards[1].classList.add('matched')
        }

        // Desvira as cartas após um breve intervalo
        setTimeout(() => {
            flipBackCards()
        }, 1000)
    }

    // Verifica se todas as cartas foram viradas
    if (!document.querySelectorAll('.card:not(.flipped)').length) {
        // Exibe mensagem de vitória e encerra o loop do tempo
        setTimeout(() => {
            selectors.boardContainer.classList.add('flipped')
            selectors.win.innerHTML = `
                <span class="win-text">
                    Você venceu!<br />
                    com <span class="highlight">${state.totalFlips}</span> movimentos<br />
                    em <span class="highlight">${state.totalTime}</span> segundos
                </span>
            `

            clearInterval(state.loop)
        }, 1000)
    }
}

// Função para anexar ouvidores de eventos aos elementos DOM
const attachEventListeners = () => {
    document.addEventListener('click', event => {
        const eventTarget = event.target
        const eventParent = eventTarget.parentElement

        // Vira a carta se clicada e não estiver virada
        if (eventTarget.className.includes('card') && !eventParent.className.includes('flipped')) {
            flipCard(eventParent)
        } else if (eventTarget.nodeName === 'BUTTON' && !eventTarget.className.includes('disabled')) {
            // Inicia o jogo se o botão de início for clicado
            startGame()
        }
    })
}

// Gera o tabuleiro inicial e anexa ouvidores de eventos
generateGame()
attachEventListeners()
