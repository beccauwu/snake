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

// false if p is pressed, disables death
window.deathEnabled = true
// stores the changed size, if it's the same as current size canvassize won't loop endlessly
let size;
// canvas
let canvas = document.getElementById('snakeCanvas')
let ctx = canvas.getContext('2d')
// middlepoint
let mX = canvas.getAttribute('width')/2
let mY = canvas.getAttribute('height')/2
// 0 if flex column, 1 if flex row
let styleStatus;
// 0 if controller on right, 1 if controller on left
let sideStatus = 0
// 1 if main is called
let canvasDrawn = 0
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
let dataArray = [
    {date: '24/06/2022', name: 'snakeplayer', points: '500'},
    {date: '22/06/2022', name: 'snakeplayer2', points: '400'},
    {date: '23/06/2022', name: 'snakeplayer3', points: '350'},
    {date: '21/06/2022', name: 'snakeplayer4', points: '300'},
    {date: '20/06/2022', name: 'snakeplayer5', points: '200'},
];

let controls = document.getElementById('controls')
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
controls.innerHTML = buttons
let showLeaderboardForm = 0

// make it true if game ends
/* function toggleControls(){
    if (dead === 1) {
        showLeaderboardForm = 1;

    }
    // switch up the html when is true
    if (showLeaderboardForm === 1) {

    } else{

    }
} */

let snakePosition = [];

// toggle leaderboard
const leaderboardContainer = document.getElementById('leaderboard-container');
const showLeaderboard = document.getElementById('showLeaderboard');
const scoreContainer = document.getElementById('score-container');
const canvasContainer = document.getElementById('canvas-container');
const leaderboardBtnContainer = document.getElementById('leaderboardBtnContainer')
const game = document.getElementById('game')
showLeaderboard.addEventListener('click', toggleLeaderboard)
showLeaderboard.innerHTML = `<p id="showLeaderboardP" class="mono">Show leaderboard <br> and add yourself to it</p>`
function toggleLeaderboard(){
    const cl = leaderboardContainer.getAttribute('class');
    if (cl === 'hidden') {
        leaderboardContainer.setAttribute('class', 'marginauto center shown');
        leaderboardContainer.appendChild(scoreContainer);
        controls.style.display = 'none'
        canvasContainer.style.display = 'none'
        leaderboardBtnContainer.style.display = 'none'
        leaderboardContainer.append(showLeaderboard)
        showLeaderboard.innerHTML = `<p id="showLeaderboardP" class="mono">Hide leaderboard <br> and continue playing</p>`
        document.getElementById('leaderboard-submit').addEventListener('click', writePlayerData);
    } else {
        leaderboardContainer.setAttribute('class', 'hidden');
        game.prepend(scoreContainer);
        leaderboardBtnContainer.style.display = 'block'
        leaderboardBtnContainer.append(showLeaderboard);
        controls.style.display = 'flex'
        canvasContainer.style.display = 'block'
        showLeaderboard.innerHTML = `<p id="showLeaderboardP" class="mono">Show leaderboard <br> and add yourself to it</p>`
    }
};
// push input value into array with score checking if name already exists
function writePlayerData(e){
    e.preventDefault();
    const nameOf = document.getElementById('name').value
    const submitButton = document.getElementById('leaderboard-submit')
    const msg = document.getElementById('message')
    for (let i = 0; i < dataArray.length; i++) {
        const player = dataArray[i];
        const name = player.name
        const points = player.points
        if (name === nameOf){
            // if name exists and score is higher than previous, delete old data and add new data
            if (score > points) {
                dataArray.pop(player);
                dataArray.push({date: today, name: nameOf, points: score});
                console.log(dataArray)
                msg.innerHTML = 'Well done! <br> You improved since last time :3';
                updateTable();
                submitButton.removeEventListener('click', writePlayerData);
                submitButton.setAttribute('value', 'Play again?');
                submitButton.addEventListener('click', playAgain);
            } else {
                msg.innerHTML = 'Please choose another name'
            }
        } else {
            dataArray.push({date: today, name: nameOf, points: score});
            updateTable();
            msg.innerHTML = 'Thank you for your submission';
            submitButton.removeEventListener('click', writePlayerData);
            submitButton.setAttribute('value', 'Play again?');
            submitButton.addEventListener('click', playAgain);

        }
    }
    // write updated data to local storage
    msg.style.display = 'initial';
}
function canvasContainerSize(){
    if (canvasDrawn === 0) {
        canvasContainer.style.width = '90vw';

    } else if (canvasDrawn === 1) {
        canvasContainer.style.width = 'fit-content'
    }
}
/* function updateLocalStorage() {
    // remove old data from local storage
    localStorage.removeItem('leaderboard_local');
    localStorage.setItem('leaderboard_local', JSON.stringify(dataArray.sort(({points:a}, {points:b}) => b-a)))
} */
function updateTable(){
    const tr = document.getElementsByTagName('tr');
    for (let i = 1; i < tr.length; i++) {
        const row = tr[i];
        row.remove();
    }
    for (let i = 0; i < 6; i++) {
        const row = document.createElement('tr');
        const dateTd = document.createElement('td')
        const nameTd = document.createElement('td');
        const scoreTd = document.createElement('td');
        dateTd.setAttribute('class', 'date tableLeft')
        nameTd.setAttribute('class', 'name tableCentre');
        scoreTd.setAttribute('class', 'score tableRight');
        row.appendChild(dateTd);
        row.appendChild(nameTd);
        row.appendChild(scoreTd);
        dateTd.innerHTML = dataArray[i].date;
        nameTd.innerHTML = dataArray[i].name;
        scoreTd.innerHTML = dataArray[i].points;
        document.getElementById('leaderboard-tbody').appendChild(row);
    }
}
// reload to play again
function playAgain(){
    location.reload();
}

let score = 0;
// true if changing direction
let changingDirection = false;
// leaderboard

//timer
let timeLeft;

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
// updateTable();
countdown();
generateFood();
clearCanvas();
drawFood();
drawSnake();
// wait for database to get imported
window.onload = updateTable();
// start countdown
function countdown() {
    timeLeft = 5
    const topContainer = document.getElementById('topContainer');
    const countdownP = document.createElement('p');
    countdownP.setAttribute('class', 'center mono red');
    countdownP.setAttribute('id', 'countdownP');
    topContainer.appendChild(countdownP);
    const startTimer = setInterval(() => {
        if (timeLeft <= 0) {
            countdownP.style.display = 'none'
            clearInterval(startTimer);
            //draw canvas from start
            main();
            document.addEventListener('keydown', whichKey);
            canvasContainerSize();
        } else {
            countdownP.innerHTML = "game starts in <br>" + timeLeft
        }
        timeLeft -= 1;
    }, 1000);
}

//main function
function main() {
    canvasDrawn = 1
    if(hasGameEnded()) return;
    if(!window.deathEnabled) return;
    changingDirection = false;
    setTimeout(function onTick() {
        canvasSize();
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
    const vw = window.innerWidth - 20;
    const vh = window.innerHeight - 20;
    const contentWidth = document.getElementById('contentWrapper').offsetWidth + 20
    const contentHeight = document.getElementById('contentWrapper').offsetHeight + 20
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
    const newHeight = 10 * Math.floor((vh - 100) / 10)
    const newWidth = 10 * Math.floor((vw - 50) / 10)
    const canvasHeight = canvas.getAttribute('height')
    const canvasWidth = canvas.getAttribute('width')
    if (vw > vh && size !== newHeight) {
        canvas.setAttribute('height', newHeight);
        canvas.setAttribute('width', newHeight);
        window.resizeTo(contentWidth, contentHeight)
        controls.prepend(scoreContainer)
        size = newHeight
        console.log('changing canvas size ' + size, newHeight)
        flexRow();

    } else if (vh > vw && size !== newWidth) {
            canvas.setAttribute('height', newWidth);
            canvas.setAttribute('width', newWidth);
            size = newWidth
            window.resizeTo(contentWidth, contentHeight)
            gameContainer.prepend(scoreContainer)
            console.log('changing canvas size ' + size, newWidth)
            flexColumn();
    }
}
const switchSides = document.getElementById('switchControlSides')
switchSides.addEventListener('click', switchSidesFunction)
function flexRow(){
    const scoreContainer = document.getElementById('score-container')
    const gameContainer = document.getElementById('game')
    const controls = document.getElementById('controls')
    const canvasContainer = document.getElementById('canvas-container')
    const switchSides = document.getElementById('switchControlSides')
    const firstBtn = document.getElementById('firstBtn')
    if (styleStatus !== 1) {
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
        styleStatus = 1
        console.log('flex direction is row')
    }
    fitWindow2Content();
}
function flexColumn(){
    const scoreContainer = document.getElementById('score-container')
    const gameContainer = document.getElementById('game')
    const controls = document.getElementById('controls')
    const canvasContainer = document.getElementById('canvas-container')
    const switchSides = document.getElementById('switchControlSides')
    const contentWrapper = document.getElementById('contentWrapper')
    if (styleStatus !== 0) {
        gameContainer.style.flexDirection = 'column'
        controls.style.height = '150px'
        controls.style.order = '2'
        controls.style.padding = '0'
        canvasContainer.style.order = '1'
        switchSides.style.display = 'none'
        styleStatus = 0
        console.log('flex direction is column')
    }
    fitWindow2Content();

}
function switchSidesFunction() {
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
    if (window.deathEnabled) {
        for (let i = 4; i < snake.length; i++) {
            if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
                dead = 1;
                console.log('you died mate');
                return true;
            }
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
            window.deathEnabled = false
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
            resumeGame();
            console.log('Game resumed. Going up')
        } else if (tempVelocity == 2) {
            dy = 10;
            tempVelocity = null;
            resumeGame();
            console.log('Game resumed. Going down')
        } else if (tempVelocity == 3) {
            dx = -10;
            tempVelocity = null;
            resumeGame();
            console.log('Game resumed. Going left');
        } else if (tempVelocity == 4) {
            dx = 10
            tempVelocity = null
            resumeGame();
            console.log('Game resumed. Going right');
        }
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
                dead = 0;
                dy = 0;
                console.log('Game paused when going up ' + dead)
                console.log(tempVelocity)
            } else if (dy == 10){
                tempVelocity = 2;
                dead = 0
                dy = 0;
                console.log('Game paused when going down ' + dead)
                console.log(tempVelocity)
            } else if (dx == -10) {
                tempVelocity = 3;
                dead = 0
                dx = 0;
                console.log('Game paused when going left ' + dead)
                console.log(tempVelocity)
            } else if (dx == 10) {
                tempVelocity = 4;
                dead = 0
                dx = 0;
                console.log('Game paused when going right ' + dead)
                console.log(tempVelocity)
        }
        document.getElementById('pauseBtn').innerHTML = `<i class="fa-solid fa-play"></i>`
        window.deathEnabled = false
        return true
    }

}
function resumeGame() {
    timeLeft = 3;
    const countdownP = document.getElementById('countdownP')
    countdownP.style.display = 'initial'
    const startTimer = setInterval(() => {
        if (timeLeft <= 0) {
            countdownP.innerHTML = "game resumes in <br>" + timeLeft
            countdownP.style.display = 'none'
            clearInterval(startTimer);
            window.deathEnabled = true
            main();
        } else {
            countdownP.innerHTML = "game resumes in <br>" + timeLeft
        }
        timeLeft -= 1;
    }, 1000);
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