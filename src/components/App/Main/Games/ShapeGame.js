import { Stage, Layer, Shape, Text, Circle, RegularPolygon } from "react-konva"
import Konva from "konva";
import { startTransition, useEffect, useRef, useState } from "react"

export default function ShapeGame () {
    // const [shapes, setShapes] = useState([]);
    // const [rnd, setRnd] = useState(null);

    // const shapes = [
    //     {
    //         attrs: {
    //             x : 50,
    //             y : 50,
    //             radius : 50,
    //             fill : "green"
    //         },
    //         className : "Circle"
    //     }
    // ]

    // useEffect(() => {
    //     const layer1 = questionLayer.current

    //     let newShapes = [...shapes]

    //     for (let i = 0; i < 5; i++) {
    //         const newShape = new Konva.RegularPolygon({
    //             x: window.innerWidth * 0.1 * (i+1) * 2,
    //             y: window.innerHeight/2,
    //             sides: Math.ceil(Math.random() * 5 + 3),
    //             radius: 50,
    //             fill: "green"
    //         });
    //         newShapes.push(newShape);
    //     };
        
    //     // layer1.add(newShape);
    //     // layer1.batchDraw();
    //     console.log(newShapes)
    //     setShapes(newShapes)
    //     // TODO: use the sides property in Konva.RegularPolygon to generate polygons
    // }, [rnd]);

    function generateShapes() {
        return [...Array(5)].map((_, i) => ({
            id: i.toString(),
            x: window.innerWidth * 0.1 * (i+1) * 2,
            y: window.innerHeight/2,
            sides: Math.ceil(Math.random() * 5 + 3)
        }))
    }

    const INITIAL_STATE = generateShapes();

    const [shapes, setShapes] = useState(INITIAL_STATE);

    const questionLayer = useRef();

    return (
        <div className="ShapeGame">
            <Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer ref={questionLayer}>
                    {/* <RegularPolygon
                        x={100}
                        y={100}
                        sides={9}
                        fill="green"
                        radius={50}
                    /> */}
                    {shapes.map((shape, i) => {
                        <RegularPolygon
                            key={shape.id}
                            id={shape.id}
                            x={shape.x}
                            y={shape.y}
                            sides={shape.sides}
                            fill="green"
                            radius={50}
                        />
                    })}
                </Layer>
            </Stage>
        </div>
    )
}