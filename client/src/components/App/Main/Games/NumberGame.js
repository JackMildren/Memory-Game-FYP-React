import { useEffect, useState } from "react";

export default function NumberGame() {
  // TODO - Make this a database request
  const DIFFICULTY = 3;

  const [gameState, setGameState] = useState("start");
  const [currentQuestion, setCurrentQuestion] = useState("x + y");
  const [questionNo, setQuestionNo] = useState(1);
  const [score, setScore] = useState(0);

  const initialHighScore = localStorage.getItem("numHighScore") || 0;
  const [highScore, setHighScore] = useState(initialHighScore);

  const INITIAL_BOX_LIST = [
    { answer: "0", color: "lightblue" },
    { answer: "0", color: "lightblue" },
    { answer: "0", color: "lightblue" },
    { answer: "0", color: "lightblue" },
  ];
  const [boxList, setBoxList] = useState([...INITIAL_BOX_LIST]);

  const [confirmBoxText, setConfirmBoxText] = useState("CONFIRM");
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [selectedBox, setSelectedBox] = useState(5);
  const [correctBox, setCorrectBox] = useState(0);

  const TOTAL_QUESTIONS = 10;

  function gameLoop() {
    if (questionNo < TOTAL_QUESTIONS) {
      getQuestion();
    } else {
      loadEndScreen();
    }
  }

  function getQuestion() {
    const MODIFIER_LIST = [" + ", " - ", " x "];

    let n1 = getRndInteger(1, 10);
    let n2 = getRndInteger(1, 10);
    let modifier = getRndInteger(0, DIFFICULTY - 1);

    setCurrentQuestion(n1 + MODIFIER_LIST[modifier] + n2);

    function calculateAnswer(x, y) {
      switch (modifier) {
        case 0:
          return x + y;
        case 1:
          return x - y;
        case 2:
          return x * y;
        default:
          return 0;
      }
    }

    let answer = calculateAnswer(n1, n2);

    let newVal = getRndInteger(0, 3);
    setCorrectBox(newVal);

    let tempBoxList = [...INITIAL_BOX_LIST];
    for (let box = 0; box < boxList.length; box++) {
      let newNumber = answer;

      if (box !== newVal) {
        let offBy = getRndInteger(1, 10);
        newNumber = getRndInteger(0, 1) ? answer + offBy : answer - offBy;
      }

      tempBoxList[box] = updateBox(box, newNumber, "lightblue");
    }

    setBoxList(tempBoxList);
    setSelectedBox(5);
  }

  /// OnClick Functions

  function selectAnswer(inputNo) {
    if (answerRevealed) {
      return;
    }

    setSelectedBox(inputNo);

    setConfirmBoxText("CONFIRM");
    const newBoxList = [...boxList];

    let newColor = "lightblue";
    for (let box = 0; box < boxList.length; box++) {
      box === inputNo ? (newColor = "yellow") : (newColor = "lightblue");
      newBoxList[box] = { ...newBoxList[box], color: newColor };
    }

    setBoxList(newBoxList);
  }

  function confirmBoxSelect() {
    if (selectedBox === 5) {
      return;
    }

    if (answerRevealed) {
      document.getElementById("confirmBox").hidden = true;

      setConfirmBoxText("CONFIRM");
      setAnswerRevealed(false);

      setQuestionNo(questionNo + 1);

      gameLoop();
    } else {
      let tempBoxList = resetSelection();

      tempBoxList[correctBox] = updateBox(correctBox, null, "green");
      if (selectedBox === correctBox) {
        setScore(score + 1);
      } else {
        tempBoxList[selectedBox] = updateBox(selectedBox, null, "red");
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
    setGameState("running");
    gameLoop();
  }

  function loadEndScreen() {
    setGameState("end");
    setQuestionNo(1);

    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("numHighScore", score);
    }
  }

  function restartGame() {
    setGameState("start");
    setScore(0);
  }

  /// Helper Functions

  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function resetSelection() {
    let tempBoxList = [];
    for (let box = 0; box < boxList.length; box++) {
      tempBoxList.push(updateBox(box, null, "lightblue"));
    }
    return tempBoxList;
  }

  function updateBox(boxNo, newAnswer = null, newColor = null) {
    let tempBox = { ...boxList[boxNo] };

    if (newAnswer && tempBox.answer !== newAnswer) {
      // console.log("updating box " + boxNo + " answer from " + tempBox.answer + " to " + newAnswer);
      tempBox.answer = newAnswer;
    }
    if (newColor && tempBox.color !== newColor) {
      // console.log("updating box " + boxNo + " color from " + tempBox.color + " to " + newColor);
      tempBox.color = newColor;
    }

    return tempBox;
  }

  function selectAnswerOne() {
    selectAnswer(0);
  }

  function selectAnswerTwo() {
    selectAnswer(1);
  }

  function selectAnswerThree() {
    selectAnswer(2);
  }

  function selectAnswerFour() {
    selectAnswer(3);
  }

  return (
    <div className="Game">
      <main className="gameContainer">
        {gameState === "start" && (
          <main className="gameBox" id="startScreen">
            <section>
              <p>MATHS!</p>
            </section>

            <section>
              <p id="highScore">HIGH SCORE: {highScore}</p>
            </section>

            <section>
              <button onClick={startGame}>START GAME</button>
            </section>
          </main>
        )}

        {gameState === "running" && (
          <main className="gameBox" id="runningGame">
            <section>
              <p id="questionNo">Question {questionNo}</p>
            </section>

            <section>
              <p id="question">{currentQuestion}</p>
            </section>

            <section className="answerSection">
              <button
                className="answerBox"
                style={{ backgroundColor: boxList[0].color }}
                onClick={selectAnswerOne}
              >
                {boxList[0].answer}
              </button>
              <button
                className="answerBox"
                style={{ backgroundColor: boxList[1].color }}
                onClick={selectAnswerTwo}
              >
                {boxList[1].answer}
              </button>
              <button
                className="answerBox"
                style={{ backgroundColor: boxList[2].color }}
                onClick={selectAnswerThree}
              >
                {boxList[2].answer}
              </button>
              <button
                className="answerBox"
                style={{ backgroundColor: boxList[3].color }}
                onClick={selectAnswerFour}
              >
                {boxList[3].answer}
              </button>
            </section>

            <section className="confirmButton">
              <button id="confirmBox" onClick={confirmBoxSelect}>
                {confirmBoxText}
              </button>
            </section>
          </main>
        )}

        {gameState === "end" && (
          <main className="gameBox" id="endScreen">
            <section>
              <p>GAME OVER</p>
            </section>

            <section>
              <p id="score">SCORE: {score}</p>
            </section>

            <section>
              <button
                onClick={() => {
                  restartGame();
                }}
              >
                TRY AGAIN?
              </button>
            </section>
          </main>
        )}
      </main>
    </div>
  );
}
