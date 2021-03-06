const dark = '#2f3037ff';
const green = '#00a878ff';
const red = '#b6244fff';
const boardBorder = 'black';
const boardBackground = dark;
const snakeCol = red;
const snakeBorder = red;
const switchSides = document.getElementById('switchControlSides')
const leaderboardContainer = document.getElementById('leaderboard-container');
const showLeaderboard = document.getElementById('showLeaderboard');
const scoreContainer = document.getElementById('score-container');
const canvasContainer = document.getElementById('canvas-container');
const leaderboardBtnContainer = document.getElementById('leaderboardBtnContainer');
const leaderboard = document.getElementById('leaderboard')
const game = document.getElementById('game');
const controls = document.getElementById('controls');
const form = document.getElementById('form-container');
const submitButton = document.getElementById('leaderboard-submit');
const buttons = `
<span>
    <button id="firstBtn" class="darker snakeCtrl"></button>
</span>
<span id="up" class="center">
    <button class="snakeCtrl" aria-label="button to move up"><i class="fa-solid fa-arrow-up"></i></button>
</span>
<span>
    <button class="darker snakeCtrl"></button>
</span>
<span id="left" class="floatleft">
    <button class="snakeCtrl" aria-label="button to move left"><i class="fa-solid fa-arrow-left"></i></button>
</span>
<span id="centre">
    <button id="pauseBtn" class="snakeCtrl" aria-label="button to pause and resume the game"></button>
</span>
<span id="right" class="floatright">
    <button class="snakeCtrl" aria-label="button to move right"><i class="fa-solid fa-arrow-right"></i></button>
</span>
<span>
    <button class="darker snakeCtrl"></button>
</span>
<span id="down" class="center">
    <button class="snakeCtrl" aria-label="button to move down"><i class="fa-solid fa-arrow-down"></i></button>
</span>
<span>
    <button class="darker snakeCtrl"></button>
</span>
`;
controls.innerHTML = buttons;
const btnUp = document.getElementById('up');
const btnDown = document.getElementById('down');
const btnLeft = document.getElementById('left');
const btnRight = document.getElementById('right');
const btnPause = document.getElementById('centre');
let startGame = 0;
window.deathEnabled = true;
let dead = 0;
let size;
let canvas = document.getElementById('snakeCanvas');
let ctx = canvas.getContext('2d');
let mX = canvas.getAttribute('width')/2;
let mY = canvas.getAttribute('height')/2;
let styleStatus;
let sideStatus = 0;
let canvasDrawn = 0;
let snake = [
    {x: mX, y: mY},
    {x: mX - 10, y: mY},
    {x: mX - 20, y: mY},
    {x: mX - 30, y: mY},
    {x: mX - 40, y: mY}
];
let dx = 10;
let dy = 0;
let tempVelocity = null;
let speedMultiplier = 1;
let dataArray = [
    {name: 'snakeplayer', points: 500},
    {name: 'snakeplayer2', points: 400},
    {name: 'snakeplayer3', points: 350},
    {name: 'snakeplayer4', points: 300},
    {name: 'snakeplayer5', points: 200},
    {name: 'snakeplayer6', points: 100},
    {name: 'snakeplayer7', points: 250},
];
let snakePosition = [];
let score = 0;
let changingDirection = false;
let timeLeft;
let foodX;
let foodY;

btnUp.addEventListener('click', moveUp);
btnDown.addEventListener('click', moveDown);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnPause.addEventListener('click', pauseGame);
document.getElementById('pauseBtn').innerHTML = `<i class="fa-solid fa-pause"></i>`;
document.getElementById('controls').style.display = 'flex';
document.getElementById('leaderboard-submit').addEventListener('click', writePlayerData, {once : true});
showLeaderboard.addEventListener('click', toggleLeaderboard);
switchSides.addEventListener('click', switchSidesFunction);
showLeaderboard.innerHTML = `<p id="showLeaderboardP" class="mono">Game starts in</p>`;

/**
 * Restarts game
 */
function playAgain(){
    location.reload();
}
/**
 * Calls first functions
 */
generateFood();
countdown();
updateTable();
/**
 * 5s countdown to start game
 */
function countdown() {
    timeLeft = 5;
    toggleLeaderboard();
    const startTimer = setInterval(() => {
        if (timeLeft <= 0) {
            startGame = 1;
            toggleLeaderboard();
            clearInterval(startTimer);
            //draw canvas from start
            main();
            document.addEventListener('keydown', whichKey);
        } else {
            showLeaderboard.innerHTML = `<p id="showLeaderboardP" class="mono">Game starts in <br> ${timeLeft}</p>`;
        }
        timeLeft -= 1;
    }, 1000);
}

/**
 * Main function
 * @returns when game ends or is paused
 */
function main() {
    canvasDrawn = 1;
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
    }, 100*speedMultiplier);
}
/**
 * Responsive canvas size
 */
function canvasSize(){
    const vw = window.innerWidth - 20;
    const vh = window.innerHeight - 20;
    const contentWidth = document.getElementById('contentWrapper').offsetWidth + 20;
    const contentHeight = document.getElementById('contentWrapper').offsetHeight + 20;
    const newHeight = 10 * Math.floor((vh - 100) / 10);
    const newWidth = 10 * Math.floor((vw - 50) / 10);
    if (vw > vh && size !== newHeight) {
        canvas.setAttribute('height', newHeight);
        canvas.setAttribute('width', newHeight);
        if (foodX > newHeight || foodY > newHeight) {
            clearCanvas();
            generateFood();
        }
        window.resizeTo(contentWidth, contentHeight);
        size = newHeight;
        flexRow();

    } else if (vh > vw && size !== newWidth) {
            canvas.setAttribute('height', newWidth);
            canvas.setAttribute('width', newWidth);
            if (foodX > newWidth || foodY > newWidth) {
                clearCanvas();
                generateFood();
            }
            size = newWidth;
            window.resizeTo(contentWidth, contentHeight);
            flexColumn();
    }
}
/**
 * Styling in landscape mode
 */
function flexRow(){
    const gameContainer = document.getElementById('game');
    const controls = document.getElementById('controls');
    const canvasContainer = document.getElementById('canvas-container');
    if (styleStatus !== 1) {
        gameContainer.style.flexDirection = 'row';
        gameContainer.style.alignItems = 'center';
        gameContainer.style.width = 'fit-content';
        controls.style.order = '3';
        controls.style.height = '250px';
        controls.style.paddingLeft = '30px';
        canvasContainer.style.order = '2';
        switchSides.style.order = '1';
        switchSides.style.width = '210px';
        switchSides.style.marginRight = '32px';
        switchSides.style.border = '2px solid var(--green)';
        switchSides.style.borderRadius = '15px';
        switchSides.style.backgroundColor = 'var(--dark)';
        switchSides.style.display = 'block';
        switchSides.innerHTML = `<p id="switchSidesP" class="yellow mono bold">Click to move controls <br> here</p>`;
        controls.prepend(scoreContainer);
        styleStatus = 1;
    }
}
/**
 * Styling in portrait mode
 */
function flexColumn(){
    const controls = document.getElementById('controls');
    const canvasContainer = document.getElementById('canvas-container');
    if (styleStatus !== 0) {
        game.style.flexDirection = 'column';
        controls.style.height = '180px';
        controls.style.order = '2';
        controls.style.padding = '0';
        canvasContainer.style.order = '1';
        switchSides.style.display = 'none';
        game.prepend(scoreContainer);
        styleStatus = 0;
    }
}
/**
 * Switches control side in landscape mode
 */
function switchSidesFunction() {
    if (sideStatus === 0) {
        controls.style.order = '1';
        switchSides.style.order = '3';
        switchSides.style.marginRight = '0';
        switchSides.style.marginLeft = '32px';
        controls.style.paddingLeft = '0';
        controls.style.paddingRight = '30px';
        sideStatus = 1;
    } else if (sideStatus === 1) {
        controls.style.order = '3';
        controls.style.paddingRight = '0';
        controls.style.paddingLeft = '30px';
        switchSides.style.order = '1';
        switchSides.style.marginRight = '32px';
        switchSides.style.marginLeft = '0';

        sideStatus = 0;
    }
}

/**
 * border around canvas
 */
function clearCanvas() {
    const size = canvas.getAttribute('height');
    ctx.fillStyle = boardBackground;
    ctx.strokeStyle = boardBorder;
    ctx.fillRect(0, 0, size, size);
    ctx.strokeRect(0, 0, size, size);
}

/**
 * draws the full snake
 */
function drawSnake() {
    snake.forEach(drawSnakePart);
}

/**
 * draws snake parts
 */
function drawSnakePart(snakePart) {
    ctx.fillStyle = snakeCol;
    ctx.strokeStyle = snakeBorder;
    ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

/**
 * draws food
 */
function drawFood(){
    ctx.fillStyle = green;
    ctx.strokeStyle = green;
    ctx.fillRect(foodX, foodY, 10, 10);
    ctx.strokeRect(foodX, foodY, 10, 10);
}

/**
 * looks if game ends
 * @returns true when it does
 */
function hasGameEnded() {
    if (window.deathEnabled) {
        for (let i = 4; i < snake.length; i++) {
            if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
                dead = 1;
                toggleLeaderboard();
                return true;
            }
        }
    }
}

/**
 * creates random food coordinates
 * @returns the coordinates
 */
function randomFood(min, max) {
    return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}
/**
 * Generates food
 */
function generateFood() {
    foodX = randomFood(0, canvas.width - 10);
    foodY = randomFood(0, canvas.height - 10);
    snake.forEach(function hasEatenFood(part) {
        const hasEaten = part.x == foodX && part.y == foodY;
        if(hasEaten) {
            generateFood();
        }
    });
}

/**
 * looks for a key that has a function
 * @returns if key is not valid
 */
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
            window.deathEnabled = false;
            pauseGame();
        } else {
            return;
        }
}
/**
 * changes dx/dy on keypress
 */
function moveUp() {
    if (dy !== 10 && dy !== -10){
        dx = 0;
        dy = -10;
    }
}
/**
 * changes dx/dy on keypress
 */
function moveDown() {
    if (dy !== 10 && dy !== -10){
        dx = 0;
        dy = 10;
    }
}
/**
 * changes dx/dy on keypress
 */
function moveLeft() {
    if (dx !== 10 && dx !== -10){
        dx = -10;
        dy = 0;
    }
}
/**
 * changes dx/dy on keypress
 */
function moveRight() {
    if (dx !== 10 && dx !== -10){
        dx = 10;
        dy = 0;
    }
}
/**
 * Pauses game and if game is paused resumes game
 */
function pauseGame() {
    if (tempVelocity != null && dead != 1) {
        snake[0].x = snakePosition[0].x;
        snake[0].y = snakePosition[0].y;
        document.getElementById('pauseBtn').innerHTML = `<i class="fa-solid fa-pause"></i>`;
        if (tempVelocity == 1) {
            dy = -10;
            tempVelocity = null;
            resumeGame();
        } else if (tempVelocity == 2) {
            dy = 10;
            tempVelocity = null;
            resumeGame();
        } else if (tempVelocity == 3) {
            dx = -10;
            tempVelocity = null;
            resumeGame();
        } else if (tempVelocity == 4) {
            dx = 10;
            tempVelocity = null;
            resumeGame();
        }
        return false;
    } else if (tempVelocity == null && dead != 1){
        snakePosition = [];
        for (let i = 0; i < snake.length; i++) {
            const head = snake[0];
            snakePosition.push({x: head.x + dx, y: head.y + dy});
        }
            if (dy == -10){
                tempVelocity = 1;
                dead = 0;
                dy = 0;
            } else if (dy == 10){
                tempVelocity = 2;
                dead = 0;
                dy = 0;
            } else if (dx == -10) {
                tempVelocity = 3;
                dead = 0;
                dx = 0;
            } else if (dx == 10) {
                tempVelocity = 4;
                dead = 0;
                dx = 0;
        }
        document.getElementById('pauseBtn').innerHTML = `<i class="fa-solid fa-play"></i>`;
        window.deathEnabled = false;
        return true;
    }
}
/**
 * Resumes game on a 3s timer
 */
function resumeGame() {
    timeLeft = 3;
    const countdownP = document.createElement('p');
    const topContainer = document.getElementById('topContainer');
    countdownP.setAttribute('class', 'red mono center');
    topContainer.appendChild(countdownP);
    const startTimer = setInterval(() => {
        if (timeLeft <= 0) {
            countdownP.remove();
            clearInterval(startTimer);
            window.deathEnabled = true;
            main();
        } else {
            countdownP.innerHTML = "game resumes in <br>" + timeLeft;
        }
        timeLeft -= 1;
    }, 1000);
}

/**
 * Moves snake
 */
function moveSnake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);
    const hasEaten = snake[0].x === foodX && snake[0].y === foodY;
    const atTopWall = snake[0].y < 0;
    const atBottomWall = snake[0].y > canvas.height - 10;
    const atLeftWall = snake[0].x < 0;
    const atRightWall = snake[0].x > canvas.width - 10;
    if(hasEaten) {
        score += 10;
        document.getElementById('score').innerHTML = score;
        generateFood();
        difficulty();
    } else {
        snake.pop();
    }
    if (atTopWall) {
        snake[0].y = canvas.height - 10;
    } else if (atBottomWall) {
        snake[0].y = 0;
    } else if (atLeftWall) {
        snake[0].x = canvas.width - 10;
    } else if (atRightWall) {
        snake[0].x = 0;
    }
}
/**
 * Increases speed when food is eaten
 */
function difficulty() {
    if (score <= 500) {
        speedMultiplier -= 0.005;
    }
    if (score <= 5000 && score > 500) {
        speedMultiplier -= 0.0025;
    }
    if (score <= 10000 && score > 5000) {
        speedMultiplier -= 0.00125;
    }
}
/**
 * Toggles leaderboard visibility
 */
function toggleLeaderboard(){

    const cl = leaderboardContainer.getAttribute('class');
    if (cl === 'hidden') {
        const newScoreContainerCr = document.createElement('div');
        newScoreContainerCr.setAttribute('id', 'newScore');
        newScoreContainerCr.setAttribute('class', 'marginauto center');
        newScoreContainerCr.innerHTML = `<h2 id="newScoreH2"></h2>`;
        newScoreContainerCr.style.display = 'block';
        newScoreContainerCr.style.height = '33px';
        newScoreContainerCr.style.width = 'fit-content';
        newScoreContainerCr.style.margin = '15px auto';
        newScoreContainerCr.style.border = '3px solid var(--red)';
        newScoreContainerCr.style.minWidth = '40px';
        newScoreContainerCr.style.borderRadius = '5px';
        leaderboardContainer.append(newScoreContainerCr);
        document.getElementById('newScoreH2').innerHTML = score;
        document.getElementById('newScoreH2').style.color = 'var(--green)';
        leaderboardContainer.setAttribute('class', 'marginauto center shown');
        scoreContainer.style.display = 'none';
        controls.style.display = 'none';
        canvasContainer.style.display = 'none';
        leaderboardBtnContainer.style.display = 'none';
        switchSides.style.display = 'none';
        leaderboardContainer.append(showLeaderboard);
        if (dead == 1) {
            form.style.display = 'block';
            leaderboard.style.marginTop = '0';
            leaderboardContainer.style.height = '518px';
            showLeaderboard.innerHTML = `<p id="showLeaderboardP" class="mono">You died! <br> Want to play again?</p>`;
            showLeaderboard.addEventListener('click', playAgain);
        } else if (dead == 0 && startGame == 1){
            showLeaderboard.innerHTML = `<p id="showLeaderboardP" class="mono">Hide leaderboard <br> and continue playing</p>`;
        } else if (startGame == 0) {
            form.style.display = 'none';
            leaderboardContainer.style.height = '350px';
            leaderboard.style.marginTop = '20px';
        }
    } else {
        document.getElementById('newScore').remove();
        scoreContainer.style.display = 'block';
        leaderboardContainer.setAttribute('class', 'hidden');
        leaderboardBtnContainer.style.display = 'block';
        switchSides.style.display = 'block';
        leaderboardBtnContainer.append(showLeaderboard);
        controls.style.display = 'flex';
        canvasContainer.style.display = 'block';
        showLeaderboard.innerHTML = `<p id="showLeaderboardP" class="mono">Show leaderboard</p>`;
    }
}
/**
 * push input value into array with score checking if name already exists 
 * if name exists overwrite only if current score higher than old
 */
function writePlayerData(e){
    e.preventDefault();
    const nameOf = document.getElementById('name').value;
    const label = document.getElementById('formLabel');
        if (dataArray.includes(nameOf)){
            let i = dataArray.indexOf(nameOf);
            if (dataArray[i].points < score) {
                dataArray.splice(i, 1, {name: nameOf, points: score});
                updateTable();
                submitButton.setAttribute('value', 'Well done!');
            }
        } else if (!dataArray.includes(nameOf)) {
            dataArray.push({name: nameOf, points: score});
            updateTable();
            submitButton.setAttribute('value', 'Well done!');
        } else {
                label.innerHTML = 'Please choose another name';
        }
}
/**
 * Updates table on load and when more data is added
 */
function updateTable(){
    dataArray.sort(({points:a}, {points:b}) => b-a);
    let tableHtmlStart = `
        <tbody id="leaderboard-tbody">
            <tr>
                <th class="name tableLeft">Name</th>
                <th class="score tableRight">Score</th>
            </tr>
    `;
    const tableHtmleEnd = `
        </tbody>
    `;
    const table = document.getElementById('leaderboard-table');
    for (let i = 0; i < 6; i++) {
        const row = `
                <tr>
                    <td class="name tableLeft">${dataArray[i].name}</td>
                    <td class="score tableRight">${dataArray[i].points}</td>
                </tr>
        `;
        tableHtmlStart += row;
        table.innerHTML = tableHtmlStart + tableHtmleEnd;
    }
}