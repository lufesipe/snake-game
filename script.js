let canvas = document.getElementById("snake");
let context = canvas.getContext("2d"); //Define o contexto do canvas para um objeto 2D
let box = 32; //Tamanho de cada quadrado do canvas
let snake = []; //Array que representa a cobrinha
snake[0] = {x: 8 * box, y: 8 * box} //Posição inicial da cobrinha
let direction = "right";
let food = { //Array de coordenadas aleatórias
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}
let pontos = 0;

function criarBG(){
    context.fillStyle = "#9BC405"; //Adiciona cor ao fundo do canvas
    context.fillRect(0, 0 , 16 * box, 16 * box); //Posição inicial e tamanho (16 quadrados de 32px cada) do canvas
}

function criarCobrinha(){
    for(i=0; i < snake.length; i++){
        context.fillStyle = "black"; //Adiciona cor para a cobrinha
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood(){
    context.fillStyle = "red"; //Adiciona cor para a comida
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update); //Recebe o evento de clique no teclado e chama a função update

//Define para que lado a cobrinha irá se movimentar de acordo com a tecla apertada e impede que ela se mova imediatamente para o lado oposto
function update(event){
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

function iniciarJogo(){
    //Faz a cobrinha aparecer do outro lado quando chega em uma das bordas
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    for(i=1; i < snake.length; i++){ //Faz o jogo acabar em caso de choque da cobrinha
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert("Game Over!")
        }
    }

    //Chama as funções de criar background e cobrinha ao iniciar o jogo
    criarBG();
    criarCobrinha();
    drawFood();

    //Variáveis de coordenadas da cobrinha
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Define os movimentos
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y){ //Compara a posição da cobrinha e da comida
        snake.pop(); //Remove o último elemento da cobrinha
    } else{
        food.x = Math.floor(Math.random() * 15 + 1) * box,
        food.y = Math.floor(Math.random() * 15 + 1) * box;
        pontos+=50;
        document.getElementById("pontuacao").textContent = pontos;
    }
    
    let newHead = { //Define onde a cabeça da cobra será criada
        x: snakeX,
        y: snakeY
    }
    snake.unshift(newHead); //Cria o primeiro elemento da cobrinha
}

let jogo = setInterval(iniciarJogo, 100); //Define um intervalo de 100ms para iniciar o jogo sem travamento