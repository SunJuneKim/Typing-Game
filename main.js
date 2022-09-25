//사용 변수
const GAME_TIME = 3; 
const wordInput = document.querySelector('.word-input');
const wordDisplay = document.querySelector('.word-display');
const scoreDisplay = document.querySelector('.score');
const timeDisplay = document.querySelector(".time");
const button = document.querySelector('.button');


let score = 0;
let time = GAME_TIME;
let isPlaying = false;
let timeInterval;
let words = [];
let checkInterval;


init();
rain();


function init() {
    
    score=0;
    buttonChange('게임로딩중...');
    getwords();
    wordInput.addEventListener('input', checkMatch)
}

//게임 실행 
function run() {
    if (isPlaying) {
        return;
    }
    isPlaying = true;
    time = GAME_TIME;
    wordInput.focus();
    scoreDisplay.innerText = 0;
    checkInterval = setInterval(checkStatus, 50);
    timeInterval = setInterval(countDown, 1000);
   
    buttonChange('게임 중');
}
function checkStatus() {
    if (!isPlaying && time === 0) {
     
        buttonChange("게임시작")
        clearInterval(checkInterval)
        score = 0 ;
    }

}




//단어 불러오기
function getwords() {

    axios.get('https://random-word-api.herokuapp.com/word?number=10000')
        .then(function (response) {
            // handle success
            console.log(response.data);
            response.data.forEach((word)=>{
                if(word.length <10){
                    words.push(word);
                }
            })
            buttonChange('게임시작');
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })

}
//단어일치 체크
function checkMatch() {
    if (wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()) {
        wordInput.value = "";
        if (!isPlaying) {
            return;
        }
        score++;
        
        scoreDisplay.innerText = score;
        time = GAME_TIME;
        const randomIndex = Math.floor(Math.random() * words.length);
        wordDisplay.innerText = words[randomIndex];
    }
}

buttonChange('게임시작')

function countDown() {

    time > 0 ? time-- : isPlaying = false;
    if (!isPlaying) {
        clearInterval(timeInterval)
    }
    timeDisplay.innerText = time;
}

function buttonChange(text) {
    button.innerText = text;
    text === '게임시작' ? button.classList.remove('loading')  : button.classList.add('loading');
}
function rain() {
    let amount = 100;
    let body = document.querySelector('body');
    let i = 0;
    while (i < amount) {
        let drop = document.createElement('i');

        let size = Math.random() * 10;
        let posX = Math.floor(Math.random() * window.innerWidth);
        let delay = Math.random * -20;
        let duration = Math.random() * 5;

        drop.style.width = 0.2 + size + 'px';
        drop.style.left = posX + 'px';
        drop.style.animationDelay = delay + 's';
        drop.style.animationDuration = 1 + duration + 's';
        body.appendChild(drop);
        i++
    }
}
