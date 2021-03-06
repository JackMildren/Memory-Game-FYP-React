import { Stage, Layer, RegularPolygon, Text } from "react-konva";
import { useState, useRef, useEffect } from "react";
import _ from "lodash";
import { useSelector } from "react-redux";

// Shape game component
// Provides a set of shapes and when the user presses the ready button
// one is hidden from view, a set of answer shapes are then displayed
// the user must select which was the shape removed
// Score is saved and if higher than the record, high score is updated

export default function ShapeGame() {
  // Initial state and constants set up

  let stageRef = useRef(null);
  let questionLayerRef = useRef(null);
  let answerLayerRef = useRef(null);

  const colPal = useSelector((state) => state.textSettings.value.colorPalette);

  const fullColorList = [
    [
      "true",
      ["hotpink", "blue", "green", "yellow", "orange", "purple"],
      "limeGreen",
      "red",
      "yellow",
    ],
    [
      "alt",
      ["#E69F00", "#0072B2", "#009E73", "#F0E442"],
      "#56B4E9",
      "#D55E00",
      "#F0E442",
    ],
  ];

  const colorPalette = fullColorList.filter((arr) => arr[0] === colPal)[0];

  const questionColorList = colorPalette[1];
  const correctColor = colorPalette[2];
  const incorrectColor = colorPalette[3];
  const selectColor = colorPalette[4];

  const answerShapeCount = 4;
  const TOTAL_QUESTIONS = 10;

  const [gameState, setGameState] = useState("start");
  const [questionNo, setQuestionNo] = useState(0);
  const [score, setScore] = useState(0);

  const INITIAL_HIGH_SCORE = localStorage.getItem("shapeHighScore") || 0;
  const [highScore, setHighScore] = useState(INITIAL_HIGH_SCORE);

  const [difficultyBoxList, setDifficultyBoxList] = useState([
    "yellow",
    "lightblue",
    "lightblue",
  ]);
  const [questionShapeCount, setQuestionShapeCount] = useState(3);

  const [qShapes, setQShapes] = useState(null);
  const [aShapes, setAShapes] = useState(null);

  const [selectedShape, setSelectedShape] = useState(answerShapeCount + 1);

  const [shapeHidden, setShapeHidden] = useState(questionShapeCount + 1);
  const [questionMark, setQuestionMark] = useState(null);

  const [confirmBoxText, setConfirmBoxText] = useState("READY");

  const [correctBox, setCorrectBox] = useState(questionShapeCount + 1);
  const [correctShape, setCorrectShape] = useState(null);

  // Updates shapes drawn which change in a variety of events
  useEffect(() => {
    if (stageRef.current) {
      // eslint-disable-next-line
      stageRef = stageRef.current;

      if (!qShapes) {
        setQShapes(generateShapes(true));
      }
      if (!aShapes && shapeHidden < questionShapeCount) {
        setAShapes(generateShapes(false));
      }
    }
  }, [selectedShape, shapeHidden, gameState]);

  // Primary question loop function
  function gameLoop() {
    setQShapes(null);
    setAShapes(null);
    setSelectedShape(answerShapeCount + 1);
    setShapeHidden(questionShapeCount + 1);
    setCorrectBox(questionShapeCount + 1);
    setCorrectShape(null);
    setQuestionMark(null);
    setConfirmBoxText("READY");

    if (questionNo < TOTAL_QUESTIONS) {
      setQuestionNo(questionNo + 1);
    } else {
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem("shapeHighScore", score);
      }
      loadEndScreen();
    }
  }

  // Helper function to prevent repeat shapes in questions or answers
  function getSidesColour(shapeArray) {
    let newArr = [];
    while (true) {
      const sides = Math.ceil(Math.random() * 3 + 3);
      const color =
        questionColorList[Math.floor(Math.random() * questionColorList.length)];
      newArr = [sides, color];

      let valid = true;
      for (let i = 0; i < shapeArray.length; i++) {
        if (_.isEqual([shapeArray[i].sides, shapeArray[i].color], newArr)) {
          valid = false;
          break;
        }
      }

      if (correctShape) {
        if (_.isEqual([correctShape.sides, correctShape.color], newArr)) {
          valid = false;
        }
      }

      if (valid) {
        break;
      } else {
        continue;
      }
    }
    return newArr;
  }

  // Some shapes generate at an inconsistent rotation to the design goals of the page
  // This function offsets that
  function getRotation(sides) {
    switch (sides) {
      case 4:
        return 45;
      case 6:
        return 30;
      default:
        return 0;
    }
  }

  // Primary shape generation function
  function generateShapes(questionLayer) {
    // Set up inital variables based on the conditions during the function call
    const heightAdjust = questionLayer ? 0.25 : 0.75;
    const shapeCount = questionLayer ? questionShapeCount : answerShapeCount;

    let newCorrectAnswer;
    if (!questionLayer) {
      newCorrectAnswer = Math.floor(Math.random() * answerShapeCount);
      setCorrectBox(newCorrectAnswer);
    }

    // Adding a border for design purposes
    const borderMul = questionLayer ? 0.3 : 0.5;

    let border = stageRef.attrs.width * borderMul;
    if (!questionLayer && stageRef.attrs.width < 700) {
      border *= 0.6;
    }

    // New width and height the shapes will be drawn within
    const width = stageRef.attrs.width - border;
    const height = stageRef.attrs.height;

    // Sets the new array of shapes to be drawn with a large set of parameters
    // This function could likely be shortened as a significant amount is repeated
    // due to completely different inputs required for some of the parameters
    const newShapeArray = [];
    for (let i = 0; i < shapeCount; i++) {
      let newShape;
      if (i === newCorrectAnswer) {
        newShape = {
          id: i.toString(),
          x: Math.floor((width / (shapeCount - 1)) * i) + border / 2,
          y: Math.floor(height * heightAdjust),
          sides: correctShape.sides,
          color: correctShape.color,
          radius: Math.min(80, width / 6),
          strokeWidth: !questionLayer && selectedShape === i ? 5 : 1,
          stroke: !questionLayer && selectedShape === i ? selectColor : "black",
          rotation: getRotation(correctShape.sides),
        };
      } else {
        const tempArr = getSidesColour(newShapeArray);
        const sides = tempArr[0];
        const color = tempArr[1];

        newShape = {
          id: i.toString(),
          x: Math.floor((width / (shapeCount - 1)) * i) + border / 2,
          y: Math.floor(height * heightAdjust),
          sides: sides,
          color: color,
          radius: Math.min(80, width / 6),
          strokeWidth: !questionLayer && selectedShape === i ? 5 : 1,
          stroke: !questionLayer && selectedShape === i ? selectColor : "black",
          rotation: getRotation(sides),
        };
      }
      newShapeArray.push(newShape);
    }
    return newShapeArray;
  }

  function selectShape(shapeNo) {
    setSelectedShape(parseInt(shapeNo));
    setConfirmBoxText("CONFIRM");

    const tempShapes = [...aShapes];
    for (let i = 0; i < tempShapes.length; i++) {
      tempShapes[i].strokeWidth = shapeNo === i.toString() ? 10 : 1;
    }
    return tempShapes;
  }

  function hideShape() {
    const shapeToHide = Math.floor(Math.random() * questionShapeCount);
    setShapeHidden(shapeToHide);

    const tempShapes = [...qShapes];
    for (let i = 0; i < tempShapes.length; i++) {
      if (shapeToHide === i) {
        setCorrectShape({ ...tempShapes[i] });

        tempShapes[i].color = "white";
        tempShapes[i].stroke = "white";

        const newQuestionMark = {
          x: tempShapes[i].x,
          y: tempShapes[i].y,
          fontSize: Math.min(
            1000,
            Math.floor(stageRef.current.attrs.width / 10)
          ),
        };
        newQuestionMark.x -= newQuestionMark.fontSize * 0.33;
        newQuestionMark.y -= newQuestionMark.fontSize * 0.5;
        setQuestionMark(newQuestionMark);
      }
    }
    return tempShapes;
  }

  function checkCorrectAnswer() {
    const tempShapes = [...aShapes];
    tempShapes[correctBox].stroke = correctColor;
    tempShapes[correctBox].strokeWidth = 10;

    if (selectedShape === correctBox) {
      setScore(score + 1);
    } else {
      tempShapes[selectedShape].stroke = incorrectColor;
    }
    setAShapes(tempShapes);
    setConfirmBoxText("NEXT QUESTION");
  }

  // Change Game State

  function startGame() {
    setGameState("running");
    setScore(0);
    gameLoop();
  }

  function loadEndScreen() {
    setGameState("end");
    setQuestionNo(0);
  }

  function restartGame() {
    setGameState("start");
    setScore(0);
    gameLoop();
  }

  // OnClick event handlers

  function selectDifficulty(difficulty) {
    let newDifficultyBoxList = [...difficultyBoxList];

    for (let i = 0; i < newDifficultyBoxList.length; i++) {
      newDifficultyBoxList[i] = difficulty === i ? "yellow" : "lightblue";
    }

    setDifficultyBoxList(newDifficultyBoxList);
    setQuestionShapeCount(difficulty + 3);
  }

  function handleShapeSelect(shape) {
    setAShapes(selectShape(shape.id));
  }

  function handleConfirmBoxClick() {
    if (shapeHidden > questionShapeCount) {
      // Hide box
      setQShapes(hideShape());
    }
    if (selectedShape < answerShapeCount) {
      // Check answer
      checkCorrectAnswer();
    }
    if (confirmBoxText === "NEXT QUESTION") {
      gameLoop();
    }
  }

  return (
    <div className="ShapeGame">
      {gameState === "start" && (
        <main className="gameBox" id="startScreen">
          <section>
            <p>MEMORY!</p>
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
        <main>
          <section className="questionNumber">
            <p id="questionNo">Question {questionNo}</p>
          </section>

          <Stage
            ref={stageRef}
            width={window.innerWidth - 16}
            height={window.innerHeight * 0.57}
          >
            <Layer ref={questionLayerRef}>
              {qShapes &&
                qShapes.map((shape) => (
                  <RegularPolygon
                    key={shape.id}
                    id={shape.id}
                    x={shape.x}
                    y={shape.y}
                    sides={shape.sides}
                    fill={shape.color}
                    radius={shape.radius}
                    strokeWidth={shape.strokeWidth}
                    stroke={shape.stroke}
                    rotation={shape.rotation}
                  />
                ))}
            </Layer>
            <Layer ref={answerLayerRef}>
              {aShapes &&
                aShapes.map((shape) => (
                  <RegularPolygon
                    key={shape.id}
                    id={shape.id}
                    x={shape.x}
                    y={shape.y}
                    sides={shape.sides}
                    fill={shape.color}
                    radius={shape.radius}
                    strokeWidth={shape.strokeWidth}
                    stroke={shape.stroke}
                    rotation={shape.rotation}
                    onClick={() => {
                      handleShapeSelect(shape);
                    }}
                    onTap={() => {
                      handleShapeSelect(shape);
                    }}
                  />
                ))}
              {questionMark && (
                <Text
                  x={questionMark.x}
                  y={questionMark.y}
                  text="?"
                  fontStyle="bold"
                  fontSize={questionMark.fontSize}
                />
              )}
            </Layer>
          </Stage>

          <section className="confirmButton">
            {(shapeHidden > questionShapeCount ||
              selectedShape < answerShapeCount) && (
              <button
                id="confirmBox"
                onClick={() => {
                  handleConfirmBoxClick();
                }}
              >
                {confirmBoxText}
              </button>
            )}
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
    </div>
  );
}
