import { Stage, Layer, RegularPolygon } from "react-konva";
import Konva from "konva";
import { useState } from "react";

export default function ShapeGame() {
  function generateShapes() {
    return [...Array(5)].map((_, i) => ({
      id: i.toString(),
      x: window.innerWidth * 0.2 * (i + 1),
      y: window.innerHeight / 2,
      sides: Math.ceil(Math.random() * 5 + 3),
    }));
  }

  const INITIAL_STATE = generateShapes();

  const [shapes, setShapes] = useState(INITIAL_STATE);

  return (
    <div className="ShapeGame">
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {shapes.map((shape, i) => (
            <RegularPolygon
              key={shape.id}
              id={shape.id}
              x={shape.x}
              y={shape.y}
              sides={shape.sides}
              fill="green"
              radius={50}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}
