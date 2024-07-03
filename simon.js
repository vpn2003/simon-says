let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;

const btn = document.querySelectorAll(".btns");
const start = document.querySelector(".start");
const reset = document.querySelector(".reset");

btn.forEach((btns) => {
    btns.addEventListener("click", () =>{
        if(started){
            const userChoice = btns.getAttribute("id");
            userFlash(userChoice);
            userSeq.push(userChoice);
            playGame();
        }
    });
});

const genCompChoice = () => {
    const options = ["red","blue","green","yellow"];
    const randIdx = Math.floor(Math.random() * 4);
    return options[randIdx];
};

const checkAns = () => {
    for(let i=0; i< userSeq.length; i++){
        if(userSeq[i] !== gameSeq[i]){
            return false;
        }
    }
    return true;
};

start.addEventListener("click", () => {
    started = true;
    level = 0;
    gameSeq = [];
    userSeq = [];
    nextLevel();
    console.log("Game started");
    enableButton();
});

reset.addEventListener("click", () => {
    started = false;
    level = 0;
    gameSeq = [];
    userSeq = [];
    msg.innerText = `Good Luck!`;
    enableButton();
});

function resetGame() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    msg.innerText = `Good Luck!`;
    console.log("Game reset");
    enableButton();
};

const playGame = () => {
    if (!checkAns()) {
        msg.innerText = `Wrong sequence! Game over\nPress Reset`;
        disableButton();
        setTimeout(3000);
    } else if (checkAns() && userSeq.length === gameSeq.length){
        setTimeout(() => {
            nextLevel();
        }, 1000);
    }
};

const nextLevel = () => {
    userSeq = [];
    level++;
    const nextChoice = genCompChoice();
    gameSeq.push(nextChoice);
    msg.innerText = `Level : ${level}\nGenerate sequence of length ${gameSeq.length}`;
    compFlashSequence();
};

const compFlashSequence = () => {
    let i = 0;
    const interval = setInterval(() => {
        if (i < gameSeq.length) {
            compFlash(gameSeq[i]);
            i++;
        } else {
            clearInterval(interval);
        }
    }, 600);
};

function compFlash(choice) {
    const btn = document.getElementById(choice);
    if (btn) {
        btn.classList.add("flash");
        setTimeout(() => {
            btn.classList.remove("flash");
        }, 100);
    } else {
        console.error(`Button with id ${choice} not found`);
    }
}

function userFlash(choice) {
    const btn = document.getElementById(choice);
    if (btn) {
        btn.classList.add("userflash");
        setTimeout(() => {
            btn.classList.remove("userflash");
        }, 100);
    } else {
        console.error(`Button with id ${choice} not found`);
    }
}

function disableButton() {
    const buttons = document.querySelectorAll('.btns');
    buttons.forEach(button => {
        button.disabled = true;
    });
}

function enableButton() {
    const buttons = document.querySelectorAll('.btns');
    buttons.forEach(button => {
        button.disabled = false;
    });
}