// colours
let boardBorder = 'black';
let boardBackground = 'white';
let snakeCol = 'lightblue';
let snakeBorder = 'darkblue';

/* setCanvasSize = function() {
    if (window.innerHeight > window.innerWidth) {
        canvas.width = window.innerWidth * 0.9;
        canvas.height = canvas.width;
    } else {
        canvas.height = window.innerHeight * 0.9;
        canvas.width = canvas.height;
    }
}; */
// canvas
let canvas = document.getElementById('snakeCanvas')
let ctx = canvas.getContext('2d')

// middlepoint
mX = canvas.width/2
mY = canvas.height/2

//snake
let snake = [ 
    {x: mX, y: mY}, 
    {x: mX - 10, y: mY}, 
    {x: mX - 20, y: mY}, 
    {x: mX - 30, y: mY}, 
    {x: mX - 40, y: mY}
]

let score = 0
// true if changing direction
let changingDirection = false
// horizontal velocity
let dx = 10
// vertical velocity
let dy = 0
// food
let foodX;
let foodY;
//buttons
let btnUp = document.getElementById('up')
let btnDown = document.getElementById('down')
let btnLeft = document.getElementById('left')
let btnRight = document.getElementById('right')
btnUp.addEventListener('click', moveUp)
btnDown.addEventListener('click', moveDown)
btnLeft.addEventListener('click', moveLeft)
btnRight.addEventListener('click', moveRight)

main();
generateFood();
document.addEventListener('keydown', whichKey)

//main function
function main() {

    if(hasGameEnded()) return;

    changingDirection = false;
    setTimeout(function onTick() {
        clearCanvas();
        drawFood();
        moveSnake();
        drawSnake();
        // repeat
        main();
    }, 100)
}

// draw a border around canvas
function clearCanvas() {
    ctx.fillStyle = boardBackground;
    ctx.strokeStyle = boardBorder;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
}
//print parts
function drawSnake() {
    snake.forEach(drawSnakePart);
}

//draw the snake
function drawSnakePart(snakePart) {
    //set colour of snake part
    ctx.fillStyle = snakeCol;
    //set border colour of snake part
    ctx.strokeStyle = snakeBorder;
    //draw a rectangle where part is located
    ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    //draw border around snaké part
    ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}
// draw food
function drawFood(){
    ctx.fillStyle = 'lightgreen';
    ctx.strokeStyle = 'darkgreen';
    ctx.fillRect(foodX, foodY, 10, 10);
    ctx.strokeRect(foodX, foodY, 10, 10);
}

// end game
function hasGameEnded() {
    for (let i = 4; i < snake.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
    }
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > canvas.width - 10;
    const hitTopWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > canvas.height - 10;
    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall
}

//food
function randomFood(min, max) {
    return Math.round((Math.random() * (max-min) + min) / 10) * 10
}

function generateFood() {
    foodX = randomFood(0, canvas.width - 10);
    foodY = randomFood(0, canvas.height - 10);
    snake.forEach(function hasEatenFood(part) {
        const hasEaten = part.x == foodX && part.y == foodY;
        if (hasEaten) generateFood();
    })
}

// change snake direction
function whichKey(event) {
    if (event.key == 'W' || event.key == 'w'){
        moveUp();
    } else {
        if (event.key == 'A' || event.key == 'a'){
            moveLeft();
        } else if (event.key == 'S' || event.key == 's'){
            moveDown();
        } else if (event.key == 'D' || event.key == 'd'){
            moveRight();
        } else {
            return;
        }
    }
}
function moveUp() {
    if (dy !== 10 && dy !== -10){
        dx = 0;
        dy = -10;
    }
}
function moveDown() {
    if (dy !== 10 && dy !== -10){
        dx = 0;
        dy = 10;
    }
}
function moveLeft() {
    if (dx !== 10 && dx !== -10){
        dx = -10;
        dy = 0;
    }
}
function moveRight() {
    if (dx !== 10 && dx !== -10){
        dx = 10;
        dy = 0;
    }
}

//make snake move
function moveSnake() {
    // create the new head
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    // add head to beginning of body
    snake.unshift(head);
    const hasEaten = snake[0].x === foodX && snake[0].y === foodY;
    if(hasEaten) {
        // increase score
        score += 10
        // display score
        document.getElementById('score').innerHTML = score;
        // generate new food location
        generateFood();
    } else {
        snake.pop();
    }
}



//move snake through wall
/* function teleportSnake() {
    if (snake[0].x < 0) {
        head.x = canvas.width - 1;
    }
    if (snake[0] > canvas.width) {
        head.x = 0
    }
    if (snake[0] < 0){
        head.y = canvas.height - 1
    }
    if(snake[0] > canvas.height) {
        head.y = 0
    }
} */