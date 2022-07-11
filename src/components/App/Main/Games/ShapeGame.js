import { useState, useRef, useEffect } from "react"
import { isEqual } from "underscore";

export default function ShapeGame () {

    const canvasRef = useRef(null)

    const regularpolygon = (ctx, x, y, radius, sides) => {
        if (sides < 3) return;
        ctx.beginPath();
        let a = ((Math.PI * 2)/sides);
        ctx.translate(x,y);
        ctx.moveTo(radius,0);
        for (let i = 1; i < sides; i++) {
            ctx.lineTo(radius*Math.cos(a*i),radius*Math.sin(a*i));
        }
        ctx.closePath();
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d') 
        
        const colours = ["blue", "red", "yellow", "green", "orange", "purple"]

        let shapeList = [];

        for (let i = 0; i < 5; i++) {
            const x = 70
            const y = 70
            let sides;
            let colour;
            let newShape

            function generateShapeRandoms() {
                while (true) {
                    sides = Math.floor(Math.random() * 6) + 3

                    colour = colours[Math.floor(Math.random() * colours.length)]

                    newShape = [sides, colour]

                    // Check for duplicates
                    let valid = true;
                    for (let i = 0; i < shapeList.length; i++) {
                        if (isEqual(shapeList[i], newShape)) {
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
                return newShape
            }
            
            newShape = generateShapeRandoms()

            regularpolygon(ctx, x, y, 50, sides)

            ctx.fillStyle = colour;
            ctx.fill();
            ctx.translate(x,-y);

            shapeList.push(newShape)
    }
        

    }, [regularpolygon]);

    return (
        <div className="ShapeGame">
            <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight}
            />
        </div>
    )
}