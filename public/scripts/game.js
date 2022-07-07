'use strict';

const TOTAL_QUESTIONS = 10;

let questionNo = 1;
let correctBox = 0;
let selectedBox;
let answerGiven = false;
let score = 0;
let highScore = 0;

function initGame() {
    const highScoreBox = document.getElementById("highScore");
    highScoreBox.textContent = "HIGH SCORE: " + highScore;
}

function gameLoop() {
    if (questionNo <= TOTAL_QUESTIONS) {
        const questionNumberBox = document.getElementById("questionNo");
        questionNumberBox.textContent = "Question: " + questionNo;

        getQuestion()
    } else {
        loadEndScreen()
    }
}

function getQuestion() {

    let n1 = getRndInteger(1, 10);
    let n2 = getRndInteger(1, 10);
    let add = getRndInteger(0, 1);

    let mod = add ? " + " : " - ";
    const question = document.getElementById("question");
    question.textContent = n1 + mod + n2;

    let answer = add ? n1 + n2 : n1 - n2;

    correctBox = getRndInteger(0, 3);
    const answerBoxList = document.getElementsByClassName("answerBox");
    for (let box = 0; box < answerBoxList.length; box++) {
        let offBy = getRndInteger(1, 10)
        answerBoxList[box].textContent = getRndInteger(0, 1) ? answer + offBy : answer - offBy;
    }
    answerBoxList[correctBox].textContent = answer;
}

function selectAnswer(inputNo) {
    if (answerGiven) {
        return;
    }

    selectedBox = inputNo;

    loadObject("confirmBox");

    resetSelection()
    const answerBtn = document.getElementsByClassName("answerBox")[selectedBox];
    answerBtn.style.backgroundColor = "yellow";
}

function confirmAnswer() {
    const answerBtn = document.getElementsByClassName("answerBox")[selectedBox];

    if (selectedBox === correctBox) {
        answerBtn.style.backgroundColor = "green";
        score ++;
    } else {
        const correctAnswerBtn = document.getElementsByClassName("answerBox")[correctBox];
        correctAnswerBtn.style.backgroundColor = "green";
        answerBtn.style.backgroundColor = "red";
    }

    answerGiven = true;

    hideObject("confirmBox");
    loadObject("nextQuestionBox");
    if (questionNo === TOTAL_QUESTIONS) {
        const nextQuestionBtn = document.getElementById("nextQuestionBox")
        nextQuestionBtn.textContent = "FINISH"
    }
}

function nextQuestion() {
    hideObject("nextQuestionBox");
    resetSelection()

    answerGiven = false;

    questionNo ++;
    gameLoop()
}

function loadEndScreen() {
    hideObject("runningGame");
    loadObject("endScreen");

    const scoreBox = document.getElementById("score");
    scoreBox.textContent = "SCORE: " + score;

    questionNo = 1;
}

function startGame() {
    hideObject("startScreen");
    loadObject("runningGame");
    gameLoop()
}

function restartGame() {
    hideObject("endScreen");
    loadObject("startScreen");

    if (score > highScore) {
        highScore = score
    }
    score = 0;
    initGame()
}

function loadObject(object) {
    const objectToLoad = document.getElementById(object);
    objectToLoad.style.display = "block"
}

function hideObject(object) {
    const objectToHide = document.getElementById(object);
    objectToHide.style.display = "none"
}

function resetSelection() {
    const answerBtnList = document.getElementsByClassName("answerBox");
    for (let btn = 0; btn < answerBtnList.length; btn++) {
        answerBtnList[btn].style.backgroundColor = "lightblue";
    }
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}