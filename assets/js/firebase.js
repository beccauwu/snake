// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialise Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// import database
import { getDatabase, push, query, set, orderByValue } from "firebase/database";
// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  // ...
  // The value of `databaseURL` depends on the location of the database
  apiKey: "AIzaSyDtWJjLAezUVV_jNsbiNwtZP9MWxJzv16E",
  authDomain: "snake-594e4.firebaseapp.com",
  projectId: "snake-594e4",
  storageBucket: "snake-594e4.appspot.com",
  messagingSenderId: "1062495510634",
  appId: "1:1062495510634:web:a5c7b7c9f0624711a62a13",
  measurementId: "G-7ZJQEMSTTP",
  databaseURL: "https://snake-594e4-default-rtdb.europe-west1.firebasedatabase.app/",
};

const database = getDatabase(app);

// leaderboard things

// write to database
function writePlayerData(event) {
    event.preventDefault();
    const topPlayersRef = ref(database, 'players')
    const newTopRef = push(topPlayersRef)
    const name = document.getElementById('name').value;
    const d = Date(day);
    const m = Date(month) + 1;
    const y = Date(fullYear);
    // push values into array
    set(newTopRef, {
        name: name,
        points: score,
        date: d + '/' + m + '/' + y
    })
    getPlayerData();
}
document.addEventListener('onload', getPlayerData)
document.getElementById('leaderboard-submit').addEventListener('click', writePlayerData)
let leaderboardHtml = `
<table id="leaderboard-table">
    <tr>
        <th class="name tableLeft">Name</th>
        <th class="score tableRight">Score</th>
    </tr>

`
let leaderboardHtmlEnd = `
</table>
`
// read from database
function getPlayerData(ref, onValue) {
    const topPlayersRef = query(ref(database, 'players'), orderByValue('points'))
    onValue(topPlayersRef, (snapshot) => {
        const data = snapshot.val();
        console.log(snapshot.val())
        updateLeaderboard(data)
    })
}
// update leaderboard from database
function updateLeaderboard(db) {
    let db;
    for (let i = 0; i < 4; i++) {
        const individual = db[i];
        leaderboardHtml += `
        <tr>
            <td class="name tableLeft">${individual.name}</td>
            <td class="score tableRight">${individual.points}</td>
        <tr>
        `
    }
}
leaderboard.innerHTML = leaderboardHtml + leaderboardHtmlEnd