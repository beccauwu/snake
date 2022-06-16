let snake;
let fruit;
let height;
let width;
let playArea;
let middle;

// colours
let boardBorder = 'black';
let boardBackground = 'white';
let snakeCol = 'lightblue';
let snakeBorder = 'darkblue';

// canvas
let canvas = document.getElementById('snakeCanvas')
let ctx = canvas.getContext('2d')

/* setCanvasSize = function() {
    if (window.innerHeight > window.innerWidth) {
        canvas.width = window.innerWidth * 0.9;
        canvas.height = canvas.width;
    } else {
        canvas.height = window.innerHeight * 0.9;
        canvas.width = canvas.height;
    }
}; */

// middlepoint
mX = canvas.width/2
mY = canvas.height/2

//snake
snake = [ 
    {x: mX, y: mY}, 
    {x: mX - 10, y: mY}, 
    {x: mX - 20, y: mY}, 
    {x: mX - 30, y: mY}, 
    {x: mX - 40, y: mY}
]

// true if changing direction
let changingDirection = false
// horizontal velocity
let dx = 10
// vertical velocity
let dy = 0

//start game

main();

//main function
function main() {
    setTimeout(function onTick() {
        clearCanvas();
        moveSnake();
        drawSnake();
        // call main again
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

// end game
function hasGameEnded() {
    for (let i = 0; i < snake.length; i++) {
        const hasCollided = snake[i].x === snake[0].x && snake[i].y === snake[0].y;
        if(hasCollided)
            return true
    }
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > snakeboard.width - 10;
    const hitToptWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > snakeboard.height - 10;
    return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
}

//make snake move
function moveSnake() {
    // create the new head
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    // add head to beginning of body
    snake.unshift(head);
    snake.pop();
}
// change snake direction
document.addEventListener('keydown', changeDirection)

function changeDirection(event) {
    // create wasd controls
    const upKey = 87
    const downKey = 83
    const leftKey = 65
    const rightKey = 68
    // prevent snake from reversing
    if (changingDirection) return;
    changingDirection = true;
    //check keycode of pressed key
    const keyPressed = event.keyCode;
    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;

        if (keyPressed === leftKey && !goingRight) {
            dx = -10;
            dy = 0;
        }
        if (keyPressed === upKey && !goingDown) {
            dx = 0;
            dy = -10;
        }
        if (keyPressed === rightKey && !goingLeft) {
            dx = 10;
            dy = 0;
        }
        if (keyPressed === downKey && !goingUp) {
            dx = 0;
            dy = 10;
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