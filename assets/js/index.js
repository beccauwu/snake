const textContainer = document.getElementById('indexTextContent');
const skip = document.getElementById('skip');
const btn1 = document.getElementById('indexBtn1');
const btn2 = document.getElementById('indexBtn2');
const btn3 = document.getElementById('indexBtn3');
const btn = [btn1, btn2, btn3];
const arrowRight = document.getElementById('indexNavBtnR');
const arrowLeft = document.getElementById('indexNavBtnL');

let pageNo = 0;
let h1Array = [
    'Welcome to a snake game!', 
    'Try not to die :3', 
    'The controls are easy'
];
let h2Array = [ 
    "Let's start with the basics.", 
    "1. You <em>can</em> run through walls, <br> that won't kill you <br> 2. If you hit yourself you die <br> (don't do that)",
    `1. WASD to move <br> 2. P to pause <br> 3. Mobile controls are very self-descriptive, <br> 
    you press the arrow in which direction you want to move <br> pause button to pause <br> <br>Finally: <br> 
    The best players go on the leaderboard <br> which you can open by clicking on the button<br>below the game. Let's see how good you are >;3<br><br>Good Luck!<br><br>
    <button type="button" class="marginauto center indexBtnRedir" onclick="redirect();">Start Game</button>`
];
let n;

arrowLeft.addEventListener('click', function(){
    n = 0;
    changePage();
});
arrowRight.addEventListener('click', function(){
    n = 1;
    changePage();
});
btn1.addEventListener('click', function(){
    pageNo = 0;
    n = 2;
    changePage();
});
btn2.addEventListener('click', function(){
    pageNo = 1;
    n = 2;
    changePage();
});
btn3.addEventListener('click', function(){
    pageNo = 2;
    n = 2;
    changePage();
});
skip.addEventListener('click', redirect);

// calls main function
main();

/**
 * main function
 */
function main(){
    getPage();
    writePage();
}
/**
 * removes existing text
 */
function clearPage(){
    document.getElementById('h1').remove();
    document.getElementById('h2').remove();
}
/**
 * writes new text
 */
function writePage(){
    const h1 = document.createElement('h1');
    const h2 = document.createElement('h2');
    h1.innerHTML = h1Array[pageNo];
    h2.innerHTML = h2Array[pageNo];
    h1.setAttribute('id', 'h1');
    h2.setAttribute('id', 'h2');
    h1.setAttribute('class', 'center noaction');
    h2.setAttribute('class', 'center noaction');
    textContainer.appendChild(h1);
    textContainer.appendChild(h2);
    if (pageNo === 2) {
        skip.style.display = 'none';
    } else {
        skip.style.display = 'block';
    }
}
/**
 * draws border around the number which page is active
 */
function getPage(){
    if (pageNo == 0) {
        btn1.style.border = '2px solid var(--red)';
    } else if (pageNo == 1) {
        btn2.style.border = '2px solid var(--red)';
    } else if (pageNo == 2) {
        btn3.style.border = '2px solid var(--red)';
    }
}
/**
 * changes page
 */
function changePage(){
    clearPage();
    for (let i = 0; i < btn.length; i++) {
        const bt = btn[i];
        bt.style.border = 'none';
    }
    if (n === 0) {
        pageNo -= 1;
    } else if (n === 1) {
        if (pageNo === 2) {
            pageNo = 0;
        } else {
            pageNo += 1;
        }
        
    } else if (n === 2){
    }
    main();
}
/**
 * redirects to game
 */
function redirect(){
    location.href = 'snake.html';
}