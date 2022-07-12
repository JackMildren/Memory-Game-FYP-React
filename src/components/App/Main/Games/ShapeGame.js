import { Stage, Layer, RegularPolygon } from "react-konva";
import { useState, useRef, useEffect } from "react";
import _ from 'lodash';

export default function ShapeGame() {
    let stageRef = useRef(null);
    let questionLayerRef = useRef(null);
    let answerLayerRef = useRef(null);

    const colourList = ['hotpink', 'blue', 'green', 'yellow', 'orange', 'purple'];
    const questionShapeCount = 5;
    const answerShapeCount = 4;
    
    const [qShapes, setQShapes] = useState(null);
    const [aShapes, setAShapes] = useState(null);  
    
    const [selectedShape, setSelectedShape] = useState(answerShapeCount + 1);

    useEffect(() => {
        stageRef = stageRef.current

        if (!qShapes) {
            setQShapes(generateShapes(true))
            setAShapes(generateShapes(false))
        }
    }, [selectedShape]);

    function getSidesColour(shapeArray) {
        let newArr = [];
        while (true) {
            const sides = Math.ceil(Math.random() * 3 + 3);
            const colour = colourList[Math.floor(Math.random() * colourList.length)];
            newArr = [sides, colour]

            let valid = true;
            for (let i=0; i<shapeArray.length; i++) {
                if (_.isEqual([shapeArray[i].sides, shapeArray[i].color], newArr)) {
                    valid = false;
                    break;
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

    function generateShapes(questionLayer) {
        const heightAdjust = (questionLayer ? 0.25 : 0.75);
        const shapeCount = (questionLayer ? questionShapeCount : answerShapeCount);

        const border = stageRef.attrs.width * 0.3;
        const width = stageRef.attrs.width - border;
        const height = stageRef.attrs.height;

        const newShapeArray = [];
        for (let i=0; i<shapeCount; i++) {
            const tempArr = getSidesColour(newShapeArray);
            const sides = tempArr[0];
            const colour = tempArr[1];

            const newShape = {
                id: i.toString(),
                x: Math.floor(width / (shapeCount - 1) * i) + (border / 2),
                y: Math.floor(height * heightAdjust),
                sides: sides,
                color: colour,
                radius: Math.min(80, width),
                strokeWidth: (!questionLayer && (selectedShape === i)) ? 5 : 1,
                stroke: (!questionLayer && (selectedShape === i)) ? "yellow" : "black",
            }

            newShapeArray.push(newShape);
        }
        return newShapeArray;
    }

    function selectShape(shapeNo) {
        setSelectedShape(shapeNo);

        const tempShapes = [...aShapes];
        for (let i=0; i < tempShapes.length; i++) {
            tempShapes[i].strokeWidth = (shapeNo === i.toString()) ? 10 : 1;
        }
        return tempShapes;
    }

    function handleClick(shape) {
        setAShapes(selectShape(shape.id))
    }

    return (
    <div className="ShapeGame">
        <Stage ref={stageRef} width={window.innerWidth - 16} height={window.innerHeight * 0.75}>
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
                    onClick={() => {handleClick(shape)}}
                />
                ))}
            </Layer>
        </Stage>
    </div>
    );
}
