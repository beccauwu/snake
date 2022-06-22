// import
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js'; 
import { getDatabase, ref, set, orderByChild, onValue, child, orderByKey, query, remove  } from 'https://www.gstatic.com/firebasejs/9.8.3/firebase-database.js';

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
const database = getDatabase(firebaseApp);
const leaderboard = document.getElementById('leaderboard-table');
const submitButton = document.getElementById('leaderboard-submit');
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
const indexArray = [];
const newData = JSON.parse(localStorage.getItem('leaderboard_local'))

// // get each player individually into separate objects in array, then push to local storage on load
window.onload = function dbToArray() {
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
        // write array to localstorage
        localStorage.setItem('leaderboard_local', JSON.stringify(sorted))
        console.log(JSON.parse(localStorage.getItem('leaderboard_local')))
    });
};
function mainFb(){
    const sbmBtnVal = submitButton.getAttribute('value');
    if (sbmBtnVal === 'Submit') {
        submitButton.addEventListener('click', updateDb, {once : true});
    } else if (sbmBtnVal === 'Play again?'){
        submitButton.removeEventListener('click', updateDb, {once : true});
    }
    dbToArray();
}
function updateDb () {  
    remove(rootRef);
    for (let i = 0; i < newData.length; i++) {
        const newRef = ref(database, 'players/' + newData.name)
        set(newRef, {
            date: newData.date,
            points: newData.points
        });
        console.log(rootRef);
    }
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
/* function writePlayerData(name, score) {
    // push values into database
    const newRef = ref(database, 'players/' + newData.name)
    set(newRef, {
        date: newData.date,
        points: newData.points
    });
    console.log(rootRef);
    dbToArray();
} */
function updateTable(arr) {
    for (let i = 0; i < 6; i++) {
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

function dbToArrayIn() {
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
        updateIndexTable(sorted)
    });
};
function updateIndexTable(arr) {
    for (let i = 0; i < 9; i++) {
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