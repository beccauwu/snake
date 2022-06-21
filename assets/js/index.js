const textContainer = document.getElementById('indexTextContent');
const nav = document.getElementById('indexNav');
// skip intro
const skip = document.getElementById('skip');

// buttons
const btn1 = document.getElementById('indexBtn1');
const btn2 = document.getElementById('indexBtn2');
const btn3 = document.getElementById('indexBtn3');
const btn = [btn1, btn2, btn3]
const arrowRight = document.getElementById('indexNavBtnR');
const arrowLeft = document.getElementById('indexNavBtnL');

let pageNo = 0;
var h1Array = [
    'Welcome to a snake game!', 
    'Try not to die :3', 
    'The controls are easy'
];
var h2Array = [ 
    "Let's start with the basics.", 
    "1. You <em>can</em> run through walls, <br> that won't kill you <br> 2. If you hit yourself you die <br> (don't do that) <br> 3. Try not to hit two keys at the same time on PC <br> that makes the game stop for some reason",
    "1. WASD to move <br> 2. P to pause <br> 3. Mobile controls are very self-descriptive, <br> you press the arrow in which direction you want to move <br> pause button to pause <br> Finally: <br> the best players go on the leaderboard <br> which you can open by clicking on the button"
];

main();
arrowLeft.addEventListener('click', previousPage)
arrowRight.addEventListener('click', nextPage)
function main(){
    const h1 = document.createElement('h1');
    const h2 = document.createElement('h2');
    h1.innerHTML = h1Array[pageNo];
    h2.innerHTML = h2Array[pageNo];
    h1.setAttribute('id', 'h1');
    h2.setAttribute('id', 'h2');
    h1.setAttribute('class', 'center')
    h2.setAttribute('class', 'center')
    textContainer.appendChild(h1);
    textContainer.appendChild(h2);
    btns[pageNo].style.border = '2px solid var(--red)'

}
function nextPage() {
    clearBtn();
    document.getElementById('h1').remove();
    document.getElementById('h2').remove();
    pageNo += 1
    main();
};
function previousPage() {
    clearBtn();
    document.getElementById('h1').remove();
    document.getElementById('h2').remove();
    pageNo -= 1
    main();
};
function clearBtn() {
    for (let i = 0; i < btn.length; i++) {
        const bt = btn[i];
        bt.style.border = 'none'
    };
}
function btnClick()