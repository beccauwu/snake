// colours

let dark = '#2f3037ff';
let darker = '#131316ff';
let green = '#00a878ff';
let lightred = '#cd3f69f';
let red = '#b6244fff';
let white = '#ffffff';

let boardBorder = 'black';
let boardBackground = dark;
let snakeCol = red;
let snakeBorder = red;

// viewport dimensions
let vw = window.innerWidth;
let vh = window.innerHeight;

let theEnd;

// canvas
let canvas = document.getElementById('snakeCanvas')
let ctx = canvas.getContext('2d')

//responsive sizing
if (vw >= 450) if (vw > vh) {
    canvas.setAttribute('height', vh*0.7);
} else if (vh > vw) {
    canvas.setAttribute('width', vw*0.7);
} else {
    canvas.setAttribute('width', vw);
}

//make height the same as width and viceversa
canvas.setAttribute('height', canvas.getAttribute('width'));
canvas.setAttribute('width', canvas.getAttribute('height'));

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

//leaderboard

let scores = [];
let underCanvas = document.getElementById('controls')
let buttons = `
<span>
    <button></button>
</span>
<span id="up" class="center">
    <button><i class="fa-solid fa-arrow-up"></i></button>
</span>
<span>
    <button></button>
</span>
<span id="left" class="floatleft">
    <button><i class="fa-solid fa-arrow-left"></i></button>
</span>
<span id="centre">
    <button><i class="fa-solid fa-play"></i></button>
</span>
<span id="right" class="floatright">
    <button><i class="fa-solid fa-arrow-right"></i></button>
</span>
<span>
    <button></button>
</span>
<span id="down" class="center">
    <button><i class="fa-solid fa-arrow-down"></i></button>
</span>
<span>
    <button></button>
</span>
`;

let showLeaderboardForm = false

// make it true if game ends
if (theEnd === true) {
    showLeaderboardForm = true;
}
// switch up the html when is true
if (showLeaderboardForm == true) {
    underCanvas.innerHtml = leaderboardForm
} else{
    underCanvas.innerHTML = buttons
}

// push input value into array with score checking if name already exists
function leaders(){
    const nameOf = document.getElementById('name').value
    const msg = document.getElementById('message')
    const submitButton = document.getElementById('leaderboard-submit')
    if (scores.includes(nameOf)){
        // if name exists and score is higher than previous, overwrite
        if (score > scores[scores.indexOf(nameOf)].points) {
            scores[scores.indexOf(nameOf)].points = score
            msg.innerHTML = 'Well done!'
            submitButton.setAttribute('value', 'Play Again?')
            submitButton.setAttribute('onclick', 'playAgain();')

        } else {
            msg.innerHTML = 'Please choose another name'
        }
    } else {
        scores.push({name: nameOf, points: score});
        msg.innerHTML = 'Thank you for your submission';
        submitButton.setAttribute('value', 'Play Again?')
        submitButton.setAttribute('onclick', 'playAgain();')
        
    }
    msg.style.display = initial;
}

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
//draw canvas from starts
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
    ctx.fillStyle = green;
    ctx.strokeStyle = green;
    ctx.fillRect(foodX, foodY, 10, 10);
    ctx.strokeRect(foodX, foodY, 10, 10);
}

// end game
function hasGameEnded() {
    for (let i = 4; i < snake.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            theEnd = true
            return true;
        } 
    }
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
        if(hasEaten) {
            generateFood();
        }
    })
}

// change snake direction
function whichKey(event) {
    if (event.key == 'W' || event.key == 'w'){
        moveUp();
    } else if (event.key == 'A' || event.key == 'a'){
            moveLeft();
        } else if (event.key == 'S' || event.key == 's'){
            moveDown();
        } else if (event.key == 'D' || event.key == 'd'){
            moveRight();
        } else if (event.key == '(blank space)'){
            pauseGame();
        } else {
            return;
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
    const atTopWall = snake[0].y < 0;
    const atBottomWall = snake[0].y > canvas.height - 10;
    const atLeftWall = snake[0].x < 0
    const atRightWall = snake[0].x > canvas.width - 10
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
    //make snake come through the other side if hit a wall
    if (atTopWall) {
        snake[0].y = canvas.height - 10
    } else if (atBottomWall) {
        snake[0].y = 0
    } else if (atLeftWall) {
        snake[0].x = canvas.width - 10
    } else if (atRightWall) {
        snake[0].x = 0
    }
}

function pauseGame() { 

 }