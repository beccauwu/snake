const textContainer = document.getElementById('indexTextContent');
let h1 = document.getElementById('indexh1');
let h2 = document.getElementById('indexh2');
textContainer.addEventListener('click', gettingStarted);
let h1Html = h1.textContent
let h2Html = h2.textContent
h1Html = 'Welcome to a snake game!'
h2Html = "Let's start with the rules."
function gettingStarted() {
    if (h1Html == 'Welcome to a snake game!') {
        h1Html = 'Try not to die :3';
        h2Html = "1. You <em>can</em> run through walls. <br> that won't kill you";
        document.createElement('h2').setAttribute('id', 'rule2').innerHTML = "2. If you hit yourself you die <br> (don't do that)"
        document.createElement('h2').setAttribute('id', 'rule3').innerHTML = "3. Try not to hit two keys at the same time on PC <br> that makes the game stop for some reason"
        document.createElement('h2').setAttribute('id', 'rule4').innerHTML = "4. Enjoy!"
    } if (h1Html == 'Try not to die >;3') {
        h1Html = 'The controls are easy'
        h2Html = 'WASD to move'
        document.getElementById('rule2').innerHTML = 'P to pause'
        document.getElementById('rule3').innerHTML = 'Mobile controls are very self-descriptive'
        document.getElementById('rule4').setAttribute('class', 'hidden')
    } if (h1Html == 'The controls are easy') {
        h1Html = 'These are the best players to date'
        h2Html = 'Try to beat them if you can >;3'
        document.getElementById('indexLeaderboardContainer').setAttribute('class', 'shown')
    }
}