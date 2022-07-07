import { useEffect, useState } from "react";

export default function Game () {
    const [gameState, setGameState] = useState("start");
    const [currentQuestion, setCurrentQuestion] = useState("x + y");
    const [questionNo, setQuestionNo] = useState(1);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);

    const initialState = [
        {answer: "0", color: "lightblue"},
        {answer: "0", color: "lightblue"},
        {answer: "0", color: "lightblue"},
        {answer: "0", color: "lightblue"},
        ];
    const [boxList, setBoxList] = useState([...initialState]);

    const [confirmBoxText, setConfirmBoxText] = useState("CONFIRM");
    const [answerRevealed, setAnswerRevealed] = useState(false);
    const [selectedBox, setSelectedBox] = useState({});

    let correctBox = 0;

    const TOTAL_QUESTIONS = 10;

    useEffect (() => {
    }, [answerRevealed]);

    function gameLoop() {
        if (questionNo < TOTAL_QUESTIONS) {
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
        setCurrentQuestion((n1 + mod + n2));
        let answer = add ? n1 + n2 : n1 - n2;

        let newVal = getRndInteger(0, 3)
        console.log("correct box should now be " + newVal)
        correctBox = newVal;
        console.log("correct box is now " + correctBox)

        let tempBoxList = [...initialState];
        for (let box = 0; box < boxList.length; box++) {
            console.log("correct answer: " + answer)
            console.log("correct box: " + correctBox)
            let newNumber = answer;

            if (box !== correctBox) {
                let offBy = getRndInteger(1, 10);
                console.log("not the correct answer, adjusting")
                console.log("off by: " + offBy)
                newNumber = getRndInteger(0, 1) ? answer + offBy : answer - offBy;
            }

            tempBoxList[box] = updateBox(box, newNumber, "lightblue");
        }

        console.log("box list about to be set")
        console.log(tempBoxList)
        setBoxList(tempBoxList);
        setSelectedBox({});
    }

    /// OnClick Functions

    function selectAnswer(inputNo) {
        if (answerRevealed) {
            return;
        }
        console.log("correct box: " + correctBox)

        setSelectedBox(inputNo);

        setConfirmBoxText("CONFIRM");

        let tempBoxList = resetSelection();
        tempBoxList[inputNo] = updateBox(inputNo, null, "yellow");
        setBoxList(tempBoxList);
    }

    function confirmBoxSelect() {
        if (isNaN(selectedBox)) {
            return;
        }

        if (answerRevealed) {
            console.log("-------MOVING TO NEXT QUESTION-------")
            document.getElementById("confirmBox").hidden = true;

            setConfirmBoxText("CONFIRM");
            setAnswerRevealed(false);
    
            setQuestionNo(questionNo + 1);

            console.log("final boxList state");
            console.log(boxList)
            gameLoop();
        } else {
            let tempBoxList = resetSelection();

            tempBoxList[correctBox] = updateBox(correctBox, null, "green")
            if (selectedBox === correctBox) {
                setScore(score + 1);
            } else {
                tempBoxList[selectedBox] = updateBox(selectedBox, null, "red")
            }
            setBoxList(tempBoxList);
    
            setConfirmBoxText("NEXT QUESTION");
            if (questionNo === TOTAL_QUESTIONS) {
                setConfirmBoxText("FINISH");
            }
            
            setAnswerRevealed(true);
        }
    }

    /// Change Game State

    function startGame() {
        setGameState("running")
        gameLoop();
    }

    function loadEndScreen() {
        setGameState("end")
        setQuestionNo(1);
    }

    function restartGame() {
        setGameState("start")

        if (score > highScore) {
            setHighScore(score);
        }
        setScore(0);
    }

    /// Helper Functions

    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }

    function resetSelection() {
        let tempBoxList = [];
        for (let box = 0; box < boxList.length; box++) {
            tempBoxList.push(updateBox(box, null, "lightblue"));
        }
        return tempBoxList;
    }

    function updateBox(boxNo, newAnswer=null, newColor=null) {
        let tempBox = {...boxList[boxNo]};

        if (newAnswer && tempBox.answer !== newAnswer) {
            console.log("updating box " + boxNo + " answer from " + tempBox.answer + " to " + newAnswer);
            tempBox.answer = newAnswer;
        }
        if (newColor && tempBox.color !== newColor) {
            // console.log("updating box " + boxNo + " color from " + tempBox.color + " to " + newColor);
            tempBox.color = newColor;
        }

        console.log("returning box")
        console.log(tempBox)        
        return tempBox;
    }

    return (
        <div className="Game">
            <main className="gameContainer">
                { gameState === "start" &&
                    <main className="gameBox" id="startScreen">
                        <section>
                            <p>MATHS!</p>
                        </section>

                        <section>
                            <p id="highScore">HIGH SCORE: {highScore}</p>
                        </section>

                        <section>
                            <button onClick={() => {startGame()}}>START GAME</button>
                        </section>
                    </main>               
                }
                
                
                { gameState === "running" && 
                    <main className="gameBox" id="runningGame">
                        <section>
                            <p id="questionNo">Question {questionNo}</p>
                        </section>

                        <section>
                            <p id="question">{currentQuestion}</p>
                        </section>

                        <section className="answerSection">
                            <button className="answerBox" style={{backgroundColor: boxList[0].color}} onClick={() => {selectAnswer(0)}}>{boxList[0].answer}</button>
                            <button className="answerBox" style={{backgroundColor: boxList[1].color}} onClick={() => {selectAnswer(1)}}>{boxList[1].answer}</button>
                            <button className="answerBox" style={{backgroundColor: boxList[2].color}} onClick={() => {selectAnswer(2)}}>{boxList[2].answer}</button>
                            <button className="answerBox" style={{backgroundColor: boxList[3].color}} onClick={() => {selectAnswer(3)}}>{boxList[3].answer}</button>
                        </section>

                        <section>
                            <button id="confirmBox" onClick={() => {confirmBoxSelect()}}>{confirmBoxText}</button>
                        </section>
                    </main>
                }

                { gameState === "end" &&
                    <main className="gameBox" id="endScreen">
                        <section>
                            <p>GAME OVER</p>
                        </section>

                        <section>
                            <p id="score">{score}</p>
                        </section>

                        <section>
                            <button onClick={() => {restartGame()}}>TRY AGAIN?</button>
                        </section>
                    </main>
                }
            </main>
        </div>
    )
}