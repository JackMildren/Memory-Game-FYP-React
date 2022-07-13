import { Stage, Layer, RegularPolygon, Text } from "react-konva";
import { useState, useRef, useEffect } from "react";
import _ from 'lodash';

export default function ShapeGame() {
    let stageRef = useRef(null);
    let questionLayerRef = useRef(null);
    let answerLayerRef = useRef(null);

    const colorList = ['hotpink', 'blue', 'green', 'yellow', 'orange', 'purple'];
    const questionShapeCount = 3;
    const answerShapeCount = 4;
    const TOTAL_QUESTIONS = 10;
    
    const [gameState, setGameState] = useState("start");
    const [questionNo, setQuestionNo] = useState(0);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);

    const [qShapes, setQShapes] = useState(null);
    const [aShapes, setAShapes] = useState(null);  
    
    const [selectedShape, setSelectedShape] = useState(answerShapeCount + 1);

    const [shapeHidden, setShapeHidden] = useState(questionShapeCount + 1);
    const [questionMark, setQuestionMark] = useState(null);

    const [confirmBoxText, setConfirmBoxText] = useState("READY");

    const [correctBox, setCorrectBox] = useState(questionShapeCount + 1);
    const [correctShape, setCorrectShape] = useState(null);

    useEffect(() => {
        if (stageRef.current) {
            // eslint-disable-next-line
            stageRef = stageRef.current

            if (!qShapes) {
                setQShapes(generateShapes(true))
            }
            if (!aShapes && shapeHidden < questionShapeCount) {
                setAShapes(generateShapes(false))
            }
        }
    }, [selectedShape, shapeHidden, gameState]);

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
            setQuestionNo(questionNo + 1)
        } else {
            (score > highScore) && setHighScore(score);
            loadEndScreen();
        }
    }

    function getSidesColour(shapeArray) {
        let newArr = [];
        while (true) {
            const sides = Math.ceil(Math.random() * 3 + 3);
            const color = colorList[Math.floor(Math.random() * colorList.length)];
            newArr = [sides, color]

            let valid = true;
            for (let i=0; i<shapeArray.length; i++) {
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
        return newArr
    }

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

    function generateShapes(questionLayer) {
        const heightAdjust = (questionLayer ? 0.25 : 0.75);
        const shapeCount = (questionLayer ? questionShapeCount : answerShapeCount);
        
        let newCorrectAnswer;
        if (!questionLayer) {
            newCorrectAnswer = Math.floor(Math.random() * answerShapeCount)
            setCorrectBox(newCorrectAnswer)
        }

        const borderMul = (questionLayer ? 0.3 : 0.5);
        const border = stageRef.attrs.width * borderMul;
        const width = stageRef.attrs.width - border;
        const height = stageRef.attrs.height;

        const newShapeArray = [];
        for (let i=0; i<shapeCount; i++) {
            let newShape;
            if (i === newCorrectAnswer) {
                newShape = {
                    id: i.toString(),
                    x: Math.floor(width / (shapeCount - 1) * i) + (border / 2),
                    y: Math.floor(height * heightAdjust),
                    sides: correctShape.sides,
                    color: correctShape.color,
                    radius: Math.min(80, width),
                    strokeWidth: (!questionLayer && (selectedShape === i)) ? 5 : 1,
                    stroke: (!questionLayer && (selectedShape === i)) ? "yellow" : "black",
                    rotation: getRotation(correctShape.sides),
                }
            } else {
                const tempArr = getSidesColour(newShapeArray);
                const sides = tempArr[0];
                const color = tempArr[1];

                newShape = {
                    id: i.toString(),
                    x: Math.floor(width / (shapeCount - 1) * i) + (border / 2),
                    y: Math.floor(height * heightAdjust),
                    sides: sides,
                    color: color,
                    radius: Math.min(80, width),
                    strokeWidth: (!questionLayer && (selectedShape === i)) ? 5 : 1,
                    stroke: (!questionLayer && (selectedShape === i)) ? "yellow" : "black",
                    rotation: getRotation(sides),
                }
            }
            newShapeArray.push(newShape);
        }
        return newShapeArray;
    }

    function selectShape(shapeNo) {
        setSelectedShape(parseInt(shapeNo));
        setConfirmBoxText("CONFIRM")

        const tempShapes = [...aShapes];
        for (let i=0; i < tempShapes.length; i++) {
            tempShapes[i].strokeWidth = (shapeNo === i.toString()) ? 10 : 1;
        }
        return tempShapes;
    }

    function hideShape() {
        const shapeToHide = Math.floor(Math.random() * questionShapeCount);
        setShapeHidden(shapeToHide);

        const tempShapes = [...qShapes];
        for (let i=0; i < tempShapes.length; i++) {
            if (shapeToHide === i) {
                setCorrectShape({...tempShapes[i]})

                tempShapes[i].color = "white"
                tempShapes[i].stroke = "white"

                const newQuestionMark = {
                    x: tempShapes[i].x,
                    y: tempShapes[i].y,
                    fontSize: Math.min(1000, Math.floor(stageRef.current.attrs.width/10))
                }
                newQuestionMark.x -= newQuestionMark.fontSize*0.33
                newQuestionMark.y -= newQuestionMark.fontSize*0.5
                setQuestionMark(newQuestionMark)
            }
        }
        return tempShapes;
    }

    function checkCorrectAnswer() {
        const tempShapes = [...aShapes]
        if (selectedShape === correctBox) {
            tempShapes[selectedShape].stroke = "limeGreen";
            setScore(score + 1)
        } else {
            tempShapes[selectedShape].stroke = "red";
        }
        setAShapes(tempShapes);
        setConfirmBoxText("NEXT QUESTION");
    }

    function startGame() {
        setGameState("running")
        setScore(0);
        gameLoop();
    }

    function loadEndScreen() {
        setGameState("end")
        setQuestionNo(0);
    }

    function restartGame() {
        setGameState("start")
        setScore(0);
        gameLoop();
    }

    function handleShapeSelect(shape) {
        setAShapes(selectShape(shape.id))
    }

    function handleConfirmBoxClick() {
        if (shapeHidden > questionShapeCount) {
            // Hide box
            setQShapes(hideShape())
        }
        if (selectedShape < answerShapeCount) {
            // Check answer
            checkCorrectAnswer()
        }
        if (confirmBoxText === "NEXT QUESTION") {
            gameLoop()
        }
    }

    return (
    <div className="ShapeGame">
        { gameState === "start" &&
          <main className="gameBox" id="startScreen">
            <section>
              <p>MEMORY!</p>
            </section>

            <section>
              <p id="highScore">HIGH SCORE: {highScore}</p>
            </section>

            <section>
              <button onClick={startGame}>START GAME</button>
            </section>
          </main>
        }

        { gameState === "running" &&
            <main>
                <section className="questionNumber">
                    <p id="questionNo">Question {questionNo}</p>
                </section>

                <Stage ref={stageRef} width={window.innerWidth - 16} height={window.innerHeight * 0.57}>
                    <Layer ref={questionLayerRef}>
                        {qShapes && qShapes.map((shape) => (
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
                        {aShapes && aShapes.map((shape) => (
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
                            onClick={() => {handleShapeSelect(shape)}}
                        />
                        ))}
                        {questionMark && 
                        <Text 
                            x={questionMark.x}
                            y={questionMark.y}
                            text="?"
                            fontStyle="bold"
                            fontSize={questionMark.fontSize}
                        />
                        }
                    </Layer>
                </Stage>
                
                <section className="confirmButton">
                    { ((shapeHidden > questionShapeCount) || (selectedShape < answerShapeCount)) &&
                        <button id="confirmBox" onClick={() => {handleConfirmBoxClick()}}>{confirmBoxText}</button>
                    }
                </section>
            </main>
        }
        { gameState === "end" &&
          <main className="gameBox" id="endScreen">
            <section>
              <p>GAME OVER</p>
            </section>

            <section>
              <p id="score">SCORE: {score}</p>
            </section>

            <section>
              <button onClick={() => {
                restartGame()
              }}>TRY AGAIN?
              </button>
            </section>
          </main>
        }
    </div>
    );
}
