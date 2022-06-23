import { dbToArray, updateDb } from './firebase.js'

let data = JSON.parse(localStorage.getItem('leaderboard_local'));
const date = new Date();
const [day, month, year] = [
    date.getDate(),
    date.getMonth() + 1,
    date.getFullYear()
]
const today = `${day}/${month}/${year}`
let dataArray = [];
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
                updateLocalStorage();
                console.log(dataArray)
                msg.innerHTML = 'Well done! <br> You improved since last time :3';
                submitButton.removeEventListener('click', writePlayerData);
                submitButton.setAttribute('value', 'Play again?');
                submitButton.addEventListener('click', playAgain);
            } else {
                msg.innerHTML = 'Please choose another name'
            }
        } else {
            dataArray.push({date: today, name: nameOf, points: score});
            updateLocalStorage();
            msg.innerHTML = 'Thank you for your submission';
            submitButton.removeEventListener('click', writePlayerData);
            submitButton.setAttribute('value', 'Play again?');
            submitButton.addEventListener('click', playAgain);

        }
    }
    // write updated data to local storage
    msg.style.display = 'initial';
}
function updateLocalStorage() {
    // remove old data from local storage
    localStorage.removeItem('leaderboard_local');
    localStorage.setItem('leaderboard_local', JSON.stringify(dataArray.sort(({points:a}, {points:b}) => b-a)))
}
function updateTable(){
    dataArray = [];
    for (let i = 0; i < data.length; i++) {
        const player = data[i]
        dataArray.push({date: player.date, name: player.name, points: player.points});
    }
    console.log(dataArray)
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