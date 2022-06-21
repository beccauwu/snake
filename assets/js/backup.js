function first (){
    const h1 = document.createElement('h1');
    const h2 = document.createElement('h2');
    // arrowLeft.style.display = 'none'
    btn1.style.border = '2px solid var(--red)';
    h1.innerHTML = 'Welcome to a snake game!';
    h2.innerHTML = "Let's start with the basics.";
    h1.setAttribute('id', 'indexh1');
    h2.setAttribute('id', 'indexh2');
    h1.setAttribute('class', 'center');
    h2.setAttribute('class', 'center');
    textContainer.appendChild(h1);
    textContainer.appendChild(h2);
    arrowLeft.addEventListener('click', toFourth)
    arrowRight.addEventListener('click', rules);
    skip.addEventListener('click', redirect);
}

function rules() {
    const h1 = document.getElementById('indexh1')
    const h2 = document.getElementById('indexh2')
    btn1.style.border = 'none';
    btn2.style.border = '2px solid var(--red)';
    h1.innerHTML = 'Try not to die :3';
    h2.innerHTML = "1. You <em>can</em> run through walls. <br> that won't kill you";
    const rule2 = document.createElement('h2');
    const rule3 = document.createElement('h2');
    const rule4 = document.createElement('h2');
    rule2.innerHTML = "2. If you hit yourself you die <br> (don't do that)";
    rule3.innerHTML = "3. Try not to hit two keys at the same time on PC <br> that makes the game stop for some reason";
    rule4.innerHTML = "4. Enjoy!";
    rule2.setAttribute('id', 'rule2');
    rule3.setAttribute('id', 'rule3');
    rule4.setAttribute('id', 'rule4');
    rule2.setAttribute('class', 'center');
    rule3.setAttribute('class', 'center');
    rule4.setAttribute('class', 'center');
    textContainer.appendChild(rule2);
    textContainer.appendChild(rule3);
    textContainer.appendChild(rule4);
    arrowRight.removeEventListener('click', rules)
    arrowRight.addEventListener('click', controls)
    document.getElementById('indexNavBtnL').addEventListener('click', toFirst)
}
function controls() {
    const h1 = document.getElementById('indexh1')
    const h2 = document.getElementById('indexh2')
    const arrowRight = document.getElementById('indexNavBtnR')
    const arrowLeft = document.getElementById('indexNavBtnL')
    btn2.style.border = 'none';
    btn3.style.border = '2px solid var(--red)';
    h1.innerHTML = 'The controls are easy'
    h2.innerHTML = 'WASD to move'
    document.getElementById('rule2').innerHTML = 'P to pause'
    document.getElementById('rule3').innerHTML = 'Mobile controls are very self-descriptive'
    document.getElementById('rule4').setAttribute('class', 'hidden')
    arrowRight.removeEventListener('click', controls)
    arrowRight.addEventListener('click', indexLeaderboard)
    arrowLeft.removeEventListener('click', rulesToFirst)
    arrowLeft.addEventListener('click', toSecond)
}
function indexLeaderboard () {
    const h1 = document.getElementById('indexh1')
    const h2 = document.getElementById('indexh2')
    btn3.style.border = 'none';
    btn4.style.border = '2px solid var(--red)';
    h1.innerHTML = 'These are the best players to date';
    h2.innerHTML = 'Try to beat them if you can >;3';
    document.getElementById('rule2').setAttribute('class', 'hidden');
    document.getElementById('rule3').setAttribute('class', 'hidden');
    document.getElementById('indexLeaderboardContainer').setAttribute('class', 'shown');
    arrowRight.removeEventListener('click', indexLeaderboard);
    arrowRight.addEventListener('click', redirect);
    arrowLeft.removeEventListener('click', controlsToRules);
    arrowLeft.addEventListener('click', toThird);
}
function toFirst(){
    document.getElementById('indexh1').remove();
    document.getElementById('indexh2').remove();
    document.getElementById('rule2').remove();
    document.getElementById('rule3').remove();
    document.getElementById('rule4').remove();
    first();
}
function toSecond() {
    document.getElementById('rule2').remove();
    document.getElementById('rule3').remove();
    document.getElementById('rule4').remove();
    rules();
}
function toThird(){
    document.getElementById('rule2').removeAttribute('class');
    document.getElementById('rule3').removeAttribute('class');
    document.getElementById('rule2').setAttribute('class', 'center');
    document.getElementById('rule3').setAttribute('class', 'center');
    controls();
}
function toFourth(){
    rules();
    document.getElementById('rule4').setAttribute('class', 'hidden');
    indexLeaderboard();
}
function redirect (){
    location.href = "snake.html";
}