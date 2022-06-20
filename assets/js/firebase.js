// import
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js'; 
import { getDatabase, ref, set, orderByChild, onValue, child, orderByKey, query  } from 'https://www.gstatic.com/firebasejs/9.8.3/firebase-database.js';

const firebaseApp = initializeApp({
        apiKey: "AIzaSyDtWJjLAezUVV_jNsbiNwtZP9MWxJzv16E",
        authDomain: "snake-594e4.firebaseapp.com",
        databaseURL: "https://snake-594e4-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "snake-594e4",
        storageBucket: "snake-594e4.appspot.com",
        messagingSenderId: "1062495510634",
        appId: "1:1062495510634:web:a5c7b7c9f0624711a62a13",
        measurementId: "G-7ZJQEMSTTP"
});
const database = getDatabase();
const leaderboard = document.getElementById('leaderboard-table');
const rootRef = ref(database, 'players/');
const date = new Date();
const [day, month, year] = [
    date.getDate(),
    date.getMonth() + 1,
    date.getFullYear()
]
const today = `${day}/${month}/${year}`
// array to hold the player data from database
const scoresArray = [];


document.getElementById('leaderboard-submit').addEventListener('click', getData);
function eventListener () {  

}

// separate function so that preventdefault is possible
function getData (e) { 
    e.preventDefault();
    const name = document.getElementById('name').value
    const score = document.getElementById('score').innerHTML
    console.log(name);
    console.log(score);
    writePlayerData(name, score);
}
function writePlayerData(name, score) {
    // push values into database
    const newRef = ref(database, 'players/' + name)
    set(newRef, {
        date: today,
        points: score
    });
    console.log(rootRef);
    dbToArray();
}
// get each player individually into separate objects in array
function dbToArray() {
    onValue(rootRef, function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            // key is the name of node aka player name
            const key = childSnapshot.key;
            // childData will be the actual contents of the child
            const childData = childSnapshot.val();
            // push the data into array
            scoresArray.push({
                date: childData.date, 
                name: key, 
                points: childData.points
            })
        });
        // sort array by points
        const sorted = scoresArray.sort(({points:a}, {points:b}) => b-a)
        updateTable(sorted)
    });
};

function updateTable(arr) {
    for (let i = 0; i < 4; i++) {
        const player = arr[i];
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
        dateTd.innerHTML = player.date
        nameTd.innerHTML = player.name;
        scoreTd.innerHTML = player.points;
        leaderboard.appendChild(row)
    }
}
const leaderboardContainer = document.getElementById('leaderboard-container');
const showLeaderboard = document.getElementById('showLeaderboard')
showLeaderboard.addEventListener('click', toggleLeaderboard)
function toggleLeaderboard(){
    const cl = leaderboardContainer.getAttribute('class');
    if (cl == 'hidden') {
        leaderboardContainer.setAttribute('class', 'shown');
    } else {
        leaderboardContainer.setAttribute('class', 'hidden');
    }
};