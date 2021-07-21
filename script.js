let canvas = document.getElementById("snake");
let context = canvas.getContext("2d"); //Define o contexto do canvas para um objeto 2D
let box = 32; //Tamanho de cada quadrado do canvas
let snake = []; //Array que representa a cobrinha
snake[0] = {x: 8 * box, y: 8 * box} //Posição inicial da cobrinha
let direction = "right";

function criarBG(){
    context.fillStyle = "lightgreen"; //Adiciona cor ao fundo do canvas
    context.fillRect(0, 0 , 16 * box, 16 * box); //Posição inicial e tamanho (16 quadrados de 32px cada) do canvas
}

function criarCobrinha(){
    for(i=0; i < snake.length; i++){
        context.fillStyle = "green"; //Adiciona cor para a cobrinha
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function iniciarJogo(){
    //Chama as funções de criar background e cobrinha ao iniciar o jogo
    criarBG();
    criarCobrinha();

    //Variáveis de coordenadas da cobrinha
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Define os movimentos
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    snake.pop(); //Remove o último elemento da cobrinha

    let newHead = { //Define onde a cabeça da cobra será criada
        x: snakeX,
        y: snakeY
    }
    snake.unshift(newHead); //Cria o primeiro elemento da cobrinha
}

let jogo = setInterval(iniciarJogo, 100); //Define um intervalor de 100ms para iniciar o jogo sem travamento