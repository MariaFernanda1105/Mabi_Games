// Obtendo referências para elementos do HTML
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const score = document.querySelector(".score--value");
const finalScore = document.querySelector(".final--score > span");
const menu = document.querySelector(".menu--screen");
const buttonPlay = document.querySelector(".btn--play");
const size = 30;

// Posição inicial da cobra
const inicialPosition = { x: 270, y: 240 };
let snake = [inicialPosition];

// Função para incrementar a pontuação
const incrementScore = () => {
    score.innerText = parseInt(score.innerText) + 10;
};

// Função para gerar número aleatório dentro de um intervalo
const randomNumber = (max, min) => {
    return Math.round(Math.random() * (max - min) + min);
};

// Função para gerar posição aleatória para a comida
const randomPosition = () => {
    const number = randomNumber(0, canvas.width - size);
    return Math.round(number / 30) * 30;
};

// Função para gerar cor aleatória
const randomColor = () => {
    const red = randomNumber(0, 255);
    const green = randomNumber(0, 255);
    const blue = randomNumber(0, 255);

    return `rgb(${red},${green}, ${blue})`;
};

// Objeto que representa a comida
const food = {
    x: randomPosition(),
    y: randomPosition(),
    color: randomColor()
};

let direction, loopId;

// Função para desenhar a comida no canvas
const drawFood = () => {
    const { x, y, color } = food;
    ctx.shadowColor = color;
    ctx.shadowBlur = 6;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, size, size);
    ctx.shadowBlur = 0;
};

// Função para desenhar a cobra no canvas
const drawSnake = () => {
    ctx.fillStyle = "white";
    snake.forEach((elemento, index) => {
        if (index == snake.length - 1) {
            ctx.fillStyle = "red";
        }
        ctx.fillRect(elemento.x, elemento.y, size, size);
    });
};

// Função para mover a cobra
const moveSnake = () => {
    if (!direction) return;
    const head = snake[snake.length - 1];

    if (direction == "right") {
        snake.push({ x: head.x + size, y: head.y });
    }

    if (direction == "left") {
        snake.push({ x: head.x - size, y: head.y });
    }

    if (direction == "down") {
        snake.push({ x: head.x, y: head.y + size });
    }

    if (direction == "up") {
        snake.push({ x: head.x, y: head.y - size });
    }

    snake.shift();
};

// Função para desenhar a grade no canvas
const drawGrid = () => {
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#191919";

    for (let i = 30; i < canvas.width; i += 30) {
        ctx.beginPath();
        ctx.lineTo(i, 0);
        ctx.lineTo(i, 600);

        ctx.stroke();

        ctx.beginPath();
        ctx.lineTo(0, i);
        ctx.lineTo(600, i);

        ctx.stroke();
    }
};

// Função para verificar se a cobra comeu a comida
const checkEat = () => {
    const head = snake[snake.length - 1];

    if (head.x == food.x && head.y == food.y) {
        incrementScore();
        snake.push(head);

        let x = randomPosition();
        let y = randomPosition();

        // Garante que a comida não apareça em cima da cobra
        while (snake.find((position) => position.x == x && position.y == y)) {
            x = randomPosition();
            y = randomPosition();
        }

        food.x = x;
        food.y = y;
        food.color = randomColor();
    }
};

// Função para verificar colisões da cobra
const checkCollision = () => {
    const head = snake[snake.length - 1];
    const canvasLimit = canvas.width - size;
    const neckIndex = snake.length - 2;
    const wallCollision =
        head.x < 0 || head.x > canvasLimit || head.y < 0 || head.y > canvasLimit;

    const selfCollision = snake.find((position, index) => {
        return index < neckIndex && position.x == head.x && position.y == head.y;
    });

    if (wallCollision || selfCollision) {
        gameOver();
    }
};

// Função chamada quando o jogo acaba
const gameOver = () => {
    direction = undefined;
    menu.style.display = "flex";
    finalScore.innerText = score.innerText;
    canvas.style.filter = "blur(2px)";
};

// Função principal do jogo
const gameLoop = () => {
    clearInterval(loopId);
    ctx.clearRect(0, 0, 600, 600);
    drawGrid();
    drawFood();
    moveSnake();
    drawSnake();
    checkEat();
    checkCollision();

    // Loop do jogo
    loopId = setTimeout(() => {
        gameLoop();
    }, 300);
};

// Inicia o loop do jogo
gameLoop();

// Evento de teclado para controlar a direção da cobra
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight" && direction !== "left") {
        direction = "right";
    } else if (event.key === "ArrowLeft" && direction !== "right") {
        direction = "left";
    } else if (event.key === "ArrowDown" && direction !== "up") {
        direction = "down";
    } else if (event.key === "ArrowUp" && direction !== "down") {
        direction = "up";
    }
});

// Evento para reiniciar o jogo ao clicar no botão "Play"
buttonPlay.addEventListener("click", () => {
    score.innerText = "00";
    menu.style.display = "none";
    canvas.style.filter = "none";
    snake = [inicialPosition];
});
