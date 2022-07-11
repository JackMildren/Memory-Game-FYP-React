import { Stage, Layer, Shape, Text, Circle, RegularPolygon } from "react-konva"
import Konva from "konva";
import { useEffect, useRef } from "react"

export default function ShapeGame () {
    const questionLayer = useRef();

    const shapes = [
        {
            attrs: {
                x : 50,
                y : 50,
                radius : 50,
                fill : "green"
            },
            className : "Circle"
        }
    ]

    useEffect(() => {
        // const layer1 = questionLayer.current
        // const newShape = new Konva.Shape(shapes)

        // layer1.add(newShape);
        // layer1.batchDraw();

        // console.log(layer1)
    })

    return (
        <div className="ShapeGame">
            <Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer ref={questionLayer}>
                    <Circle x={50} y={50} radius={50} fill="green"/>
                </Layer>
            </Stage>
        </div>
    )
}