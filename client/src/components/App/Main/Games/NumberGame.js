import { useState } from "react";

// Number game component
// Provides a simple maths question and presents 4 answers
// Score is saved and if higher than the record, high score is updated

export default function NumberGame() {
  // Initial state and constants set up

  // TODO - Make this a database request

  const [gameState, setGameState] = useState("start");
  const [currentQuestion, setCurrentQuestion] = useState("x + y");
  const [questionNo, setQuestionNo] = useState(1);
  const [score, setScore] = useState(0);

  const INITIAL_HIGH_SCORE = localStorage.getItem("numHighScore") || 0;
  const [highScore, setHighScore] = useState(INITIAL_HIGH_SCORE);

  const INITIAL_BOX_LIST = [
    { answer: "0", color: "lightblue" },
    { answer: "0", color: "lightblue" },
    { answer: "0", color: "lightblue" },
    { answer: "0", color: "lightblue" },
  ];
  const [boxList, setBoxList] = useState([...INITIAL_BOX_LIST]);

  const [difficultyBoxList, setDifficultyBoxList] = useState([
    "lightblue",
    "yellow",
    "lightblue",
  ]);
  const [difficulty, setDifficulty] = useState(2);

  const [confirmBoxText, setConfirmBoxText] = useState("CONFIRM");
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [selectedBox, setSelectedBox] = useState(5);
  const [correctBox, setCorrectBox] = useState(0);

  const TOTAL_QUESTIONS = 10;

  // Primary question loop function
  function gameLoop() {
    if (questionNo < TOTAL_QUESTIONS) {
      getQuestion();
    } else {
      loadEndScreen();
    }
  }

  // Generates the question, difficulty will change what operators
  // are used in generating the question
  // Will then generate the list of answers, with every incorrect
  // answer offset by a random number
  function getQuestion() {
    const OPERATOR_LIST = [" + ", " - ", " x "];

    let n1 = getRndInteger(1, 10);
    let n2 = getRndInteger(1, 10);
    let modifier = getRndInteger(0, difficulty - 1);

    setCurrentQuestion(n1 + OPERATOR_LIST[modifier] + n2);

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

  // OnClick event handlers

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

      tempBoxList[correctBox] = updateBox(correctBox, null, "limeGreen");
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

  // Sets all boxes to the deselected colour
  function resetSelection() {
    let tempBoxList = [];
    for (let box = 0; box < boxList.length; box++) {
      tempBoxList.push(updateBox(box, null, "lightblue"));
    }
    return tempBoxList;
  }

  // Will update a single box and return it
  function updateBox(boxNo, newAnswer = null, newColor = null) {
    let tempBox = { ...boxList[boxNo] };

    if (newAnswer && tempBox.answer !== newAnswer) {
      tempBox.answer = newAnswer;
    }
    if (newColor && tempBox.color !== newColor) {
      tempBox.color = newColor;
    }

    return tempBox;
  }

  // Updates the difficulty and difficulty button selection colour
  function selectDifficulty(difficulty) {
    let newDifficultyBoxList = [...difficultyBoxList];

    for (let i = 0; i < newDifficultyBoxList.length; i++) {
      newDifficultyBoxList[i] = difficulty === i ? "yellow" : "lightblue";
    }

    setDifficultyBoxList(newDifficultyBoxList);
    setDifficulty(difficulty + 1);
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
              <button
                className="answerBox"
                style={{ backgroundColor: difficultyBoxList[0] }}
                onClick={() => selectDifficulty(0)}
              >
                EASY
              </button>
              <button
                className="answerBox"
                style={{ backgroundColor: difficultyBoxList[1] }}
                onClick={() => selectDifficulty(1)}
              >
                MEDIUM
              </button>
              <button
                className="answerBox"
                style={{ backgroundColor: difficultyBoxList[2] }}
                onClick={() => selectDifficulty(2)}
              >
                HARD
              </button>
            </section>

            <section>
              <button className="confirmBox" onClick={startGame}>
                START GAME
              </button>
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
                onClick={() => selectAnswer(0)}
              >
                {boxList[0].answer}
              </button>
              <button
                className="answerBox"
                style={{ backgroundColor: boxList[1].color }}
                onClick={() => selectAnswer(1)}
              >
                {boxList[1].answer}
              </button>
              <button
                className="answerBox"
                style={{ backgroundColor: boxList[2].color }}
                onClick={() => selectAnswer(2)}
              >
                {boxList[2].answer}
              </button>
              <button
                className="answerBox"
                style={{ backgroundColor: boxList[3].color }}
                onClick={() => selectAnswer(3)}
              >
                {boxList[3].answer}
              </button>
            </section>

            <section className="confirmButton">
              <button
                className="confirmBox"
                id="confirmBox"
                onClick={confirmBoxSelect}
              >
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
