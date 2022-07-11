import { useState, useRef, useEffect } from "react"
import { isEqual } from "underscore";

export default function ShapeGame () {

    const canvasRef = useRef(null)

    const regularpolygon = (ctx, x, y, radius, sides, isDiamond = false) => {
        if (sides < 3) return;
        ctx.beginPath();
        let a = ((Math.PI * 2)/sides);
        ctx.translate(x,y);
        const rotateVal = (90 * Math.PI / 180)
        !isDiamond ? ctx.rotate(-rotateVal) : ctx.rotate(-rotateVal/2);
        ctx.moveTo(radius,0);
        for (let i = 1; i < sides; i++) {
            ctx.lineTo(radius*Math.cos(a*i),radius*Math.sin(a*i));
        }
        !isDiamond ? ctx.rotate(rotateVal) : ctx.rotate(rotateVal/2);
        ctx.closePath();
    }

    const circle = (ctx, x, y, radius) => {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
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
                    sides = Math.floor(Math.random() * 7)

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

                    sides === 2 && (valid = false);

                    if (valid) {
                        break;
                    } else {
                        continue;
                    }
                }
                return newShape
            }
            
            newShape = generateShapeRandoms()

            switch (sides) {
                case 0:
                    circle(ctx, x, y, 50);
                    ctx.translate(x*2, 0);
                    break;
                case 1:
                    regularpolygon(ctx, x, y, 50, 4, true);
                    ctx.translate(x,-y);
                    break;
                case 2:
                    break;
                default:
                    regularpolygon(ctx, x, y, 50, sides);
                    ctx.translate(x,-y);
                    break;
            }

            ctx.fillStyle = colour;
            ctx.fill();
            ctx.stokeStyle = "black"
            ctx.stroke()

            shapeList.push(newShape)
    }
        

    }, []);

    return (
        <div className="ShapeGame">
            <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight}
            />
        </div>
    )
}