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

let theEnd;

// canvas
let canvas = document.getElementById('snakeCanvas')
let ctx = canvas.getContext('2d')
// middlepoint
let mX = canvas.getAttribute('width')/2
let mY = canvas.getAttribute('height')/2
//snake
let snake = [ 
    {x: mX, y: mY}, 
    {x: mX - 10, y: mY}, 
    {x: mX - 20, y: mY}, 
    {x: mX - 30, y: mY}, 
    {x: mX - 40, y: mY}
]
let dx = 10;
let dy = 0;
let tempVelocity = null;
let speedMultiplier = 1;
// makes possible to change dydx to faster/slower, 0up/1down/2left/3right
//leaderboard

let data = JSON.parse(localStorage.getItem('leaderboard_local'));
// date
const date = new Date();
const [day, month, year] = [
    date.getDate(),
    date.getMonth() + 1,
    date.getFullYear()
]
const today = `${day}/${month}/${year}`

let underCanvas = document.getElementById('controls')
let buttons = `
<span>
    <button id="firstBtn" class="darker snakeCtrl"></button>
</span>
<span id="up" class="center">
    <button class="snakeCtrl"><i class="fa-solid fa-arrow-up"></i></button>
</span>
<span>
    <button class="darker snakeCtrl"></button>
</span>
<span id="left" class="floatleft">
    <button class="snakeCtrl"><i class="fa-solid fa-arrow-left"></i></button>
</span>
<span id="centre">
    <button id="pauseBtn" class="snakeCtrl"></button>
</span>
<span id="right" class="floatright">
    <button class="snakeCtrl"><i class="fa-solid fa-arrow-right"></i></button>
</span>
<span>
    <button class="darker snakeCtrl"></button>
</span>
<span id="down" class="center">
    <button class="snakeCtrl"><i class="fa-solid fa-arrow-down"></i></button>
</span>
<span>
    <button class="darker snakeCtrl"></button>
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

let snakePosition = [];

// toggle leaderboard
const leaderboardContainer = document.getElementById('leaderboard-container');
const showLeaderboard = document.getElementById('showLeaderboard')
showLeaderboard.addEventListener('click', toggleLeaderboard)
function toggleLeaderboard(){
    const cl = leaderboardContainer.getAttribute('class');
    if (cl == 'hidden') {
        leaderboardContainer.setAttribute('class', 'shown');
        document.getElementById('leaderboard.submit').setAttribute('value', 'Submit')
        document.getElementById('leaderboard-submit').addEventListener('click', writePlayerData);
    } else {
        leaderboardContainer.setAttribute('class', 'hidden');
    }
};
// push input value into array with score checking if name already exists
function writePlayerData(e){
    e.preventDefault();
    const nameOf = document.getElementById('name').value
    const submitButton = document.getElementById('leaderboard-submit')
    const msg = document.getElementById('message')
    const dataArray = [];
    dataArray.push(data);
    localStorage.removeItem('leaderboard_local');
    console.log(dataArray);
    for (let i = 0; i < dataArray.length; i++) {
        const player = dataArray[i];
        const name = player.name
        const points = player.points
        if (name === nameOf){
            // if name exists and score is higher than previous, delete old data and add new data
            if (score > points) {
                dataArray.pop(player);
                dataArray.push({date: today, name: nameOf, points: score});
                console.log(data)
                msg.innerHTML = 'Well done! <br> You improved since last time :3';
                submitButton.removeEventListener('click', writePlayerData);
                submitButton.setAttribute('value', 'Play again?');
                submitButton.addEventListener('click', playAgain);
            } else {
                msg.innerHTML = 'Please choose another name'
            }
        } else {
            data.push({date: today, name: nameOf, points: score});
            msg.innerHTML = 'Thank you for your submission';
            submitButton.removeEventListener('click', writePlayerData);
            submitButton.setAttribute('value', 'Play again?');
            submitButton.addEventListener('click', playAgain);
            
        }
    }
    localStorage.setItem('leaderboard_local', JSON.stringify(dataArray.sort(({points:a}, {points:b}) => b-a)))
    msg.style.display = initial;
}
// reload to play again
function playAgain(){
    location.reload();
}

let score = 0;
// true if changing direction
let changingDirection = false;
// leaderboard


// food
let foodX;
let foodY;
//buttons
let btnUp = document.getElementById('up')
let btnDown = document.getElementById('down')
let btnLeft = document.getElementById('left')
let btnRight = document.getElementById('right')
let btnPause = document.getElementById('centre');
btnUp.addEventListener('click', moveUp)
btnDown.addEventListener('click', moveDown)
btnLeft.addEventListener('click', moveLeft)
btnRight.addEventListener('click', moveRight)
btnPause.addEventListener('click', pauseGame)
// make the first button be pause
document.getElementById('pauseBtn').innerHTML = `<i class="fa-solid fa-pause"></i>`
// hide form container from start and show controls
document.getElementById('controls').style.display = 'flex';
//draw canvas from start
canvasSize();
// speed();
main();
generateFood();
document.addEventListener('keydown', whichKey);
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
    }, 100*speedMultiplier)
}

//responsive sizing
function canvasSize(){
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    // calculate necessary change in window's width
	const width = window.innerWidth - contentWrapper.clientWidth;
	// calculate necessary change in window's height
	const height = window.innerHeight- contentWrapper.clientHeight;
  	// resize window to fit content
	window.resizeBy( -width , -height );
    const scoreContainer = document.getElementById('score-container')
    const gameContainer = document.getElementById('game')
    const controls = document.getElementById('controls')
    const canvasContainer = document.getElementById('canvas-container')
    const switchSides = document.getElementById('switchControlSides')
    console.log(vw, vh);
    if (vw > vh) {
        const cH = vh - 250
        canvas.setAttribute('height', (10 * Math.floor(cH / 10)));
        canvas.setAttribute('width', (10 * Math.floor(cH / 10)));
        flexRow();

    } else if (vh > vw) {
        if (vh - vw >= 280) {
            canvas.setAttribute('height', (10 * Math.floor(vw / 10)));
            canvas.setAttribute('width', (10 * Math.floor(vw / 10)));
            flexColumn();
        } else {
            canvas.setAttribute('height', (10 * Math.floor(vw / 10)) - (280 - (vh-vw)));
            canvas.setAttribute('width', (10 * Math.floor(vw / 10)) - (280 - (vh-vw)));
        };
    }
}
function flexRow(){
    // 0 if controller on right, 1 if controller on left
    let sideStatus = 0
    const scoreContainer = document.getElementById('score-container')
    const gameContainer = document.getElementById('game')
    const controls = document.getElementById('controls')
    const canvasContainer = document.getElementById('canvas-container')
    const switchSides = document.getElementById('switchControlSides')
    const firstBtn = document.getElementById('firstBtn')

    controls.prepend(scoreContainer)
    gameContainer.style.flexDirection = 'row'
    gameContainer.style.alignItems = 'center'
    gameContainer.style.width = 'fit-content'
    controls.style.order = '3'
    controls.style.height = '190px'
    controls.style.paddingLeft = '30px'
    canvasContainer.style.order = '2'
    switchSides.style.order = '1'
    switchSides.style.width = '150px'
    switchSides.style.marginRight = '32px'
    switchSides.style.border = '2px solid var(--green)'
    switchSides.style.borderRadius = '15px'
    switchSides.style.backgroundColor = 'var(--dark)'
    switchSides.innerHTML = `<p id="switchSidesP" class="yellow mono bold">Click to move controls <br> here</p>`
    fitWindow2Content();

    switchSides.addEventListener('click', function () {
        if (sideStatus === 0) {
            controls.style.order = '1';
            switchSides.style.order = '3';
            switchSides.style.marginRight = '0';
            switchSides.style.marginLeft = '32px';
            controls.style.paddingLeft = '0';
            controls.style.paddingRight = '30px';
    
            sideStatus = 1;
            console.log('controls on left side')
        } else if (sideStatus === 1) {
            controls.style.order = '3'
            controls.style.paddingRight = '0'
            controls.style.paddingLeft = '30px'
            switchSides.style.order = '1'
            switchSides.style.marginRight = '32px'
            switchSides.style.marginLeft = '0'

            sideStatus = 0;
            console.log('controls on right side')
        }
    })
}
function flexColumn(){
    const scoreContainer = document.getElementById('score-container')
    const gameContainer = document.getElementById('game')
    const controls = document.getElementById('controls')
    const canvasContainer = document.getElementById('canvas-container')
    const switchSides = document.getElementById('switchControlSides')

    gameContainer.style.flexDirection = 'column'
    controls.style.height = '150px'
    controls.style.order = '2'
    canvasContainer.style.order = '1'
    switchSides.style.display = 'none'
    fitWindow2Content();

}
/* fit the window size to match the content wrapper */
function fitWindow2Content() {
    const contentWrapper = document.getElementById('contentWrapper')
	// calculate necessary change in window's width
	const width = window.innerWidth - contentWrapper.clientWidth;
	// calculate necessary change in window's height
	const height = window.innerHeight- contentWrapper.clientHeight;
  	// resize window to fit content
	window.resizeBy( -width , -height );
}
// draw a border around canvas
function clearCanvas() {
    const size = canvas.getAttribute('height')
    ctx.fillStyle = boardBackground;
    ctx.strokeStyle = boardBorder;
    ctx.fillRect(0, 0, size, size);
    ctx.strokeRect(0, 0, size, size);
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
    console.log(foodX, foodY)
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
        } else if (event.key == 'P' || event.key == 'p'){
            isGameBeingPaused = 2
            pauseGame();
        } else {
            return;
        }
    
}
// change dx/dy on keypress
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

// pause game
function pauseGame() {
    // if game is paused resume it
    if (tempVelocity != null) {
        console.log('Game already paused. Resuming...')
        snake[0].x = snakePosition[0].x
        snake[0].y = snakePosition[0].y
        document.getElementById('pauseBtn').innerHTML = `<i class="fa-solid fa-pause"></i>`
        if (tempVelocity == 1) {
            dy = -10
            tempVelocity = null
            main();
            console.log('Game resumed. Going up')
        } else if (tempVelocity == 2) {
            dy = 10;
            tempVelocity = null;
            main();
            console.log('Game resumed. Going down')
        } else if (tempVelocity == 3) {
            dx = -10;
            tempVelocity = null;
            main();
            console.log('Game resumed. Going left');
        } else if (tempVelocity == 4) {
            dx = 10
            tempVelocity = null
            main();
            console.log('Game resumed. Going right');
        }
        isGameBeingPaused = 1;
        return false
    } else {
        snakePosition = [];
        for (let i = 0; i < snake.length; i++) {
            const head = snake[0];
            snakePosition.push({x: head.x + dx, y: head.y + dy});
        };
        console.log(snakePosition);
            if (dy == -10){
                tempVelocity = 1;
                dy = 0;
                console.log('Game paused when going up')
                console.log(tempVelocity)
            } else if (dy == 10){
                tempVelocity = 2;
                dy = 0;
                console.log('Game paused when going down')
                console.log(tempVelocity)
            } else if (dx == -10) {
                tempVelocity = 3;
                dx = 0;
                console.log('Game paused when going left')
                console.log(tempVelocity)
            } else if (dx == 10) {
                tempVelocity = 4;
                dx = 0;
                console.log('Game paused when going right')
                console.log(tempVelocity)
        }
        document.getElementById('pauseBtn').innerHTML = `<i class="fa-solid fa-play"></i>`
        return true
    }
    
 }

// make snake move
function moveSnake() {
    // create the new head
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    // add head to beginning of body
    snake.unshift(head);
    const hasEaten = snake[0].x === foodX && snake[0].y === foodY;
    const atTopWall = snake[0].y < 0;
    const atBottomWall = snake[0].y > canvas.height - 10;
    const atLeftWall = snake[0].x < 0;
    const atRightWall = snake[0].x > canvas.width - 10;
    if(hasEaten) {
        // increase score
        score += 10
        // display score
        document.getElementById('score').innerHTML = score;
        // generate new food location
        generateFood();
        difficulty();
    } else {
        snake.pop();
    }
    // make snake come through the other side if hit a wall
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
// increase speed
function difficulty() {
    // decreases multiplier by 0.00125 until 1000 points, then by 0.0005 until 5000 points, then by 0.00125 until 10000 points
    if (score <= 500) {
        speedMultiplier -= 0.005
        console.log('increased difficulty by 0.005 ' + speedMultiplier)
    }
    if (score <= 5000 && score > 500) {
        speedMultiplier -= 0.0025
        console.log('increased difficulty by 0.0025 ' + speedMultiplier)
    }
    if (score <= 10000 && score > 5000) {
        speedMultiplier -= 0.00125
        console.log('increased difficulty by 0.00125 ' + speedMultiplier)
    }
}