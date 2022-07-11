import { useState, useRef, useEffect } from "react"
import _ from "lodash";

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
            const radius = 50
            let sides;
            let colour;
            let newShape

            function generateShapeRandoms() {
                while (true) {
                    sides = Math.floor(Math.random() * 7)

                    colour = colours[Math.floor(Math.random() * colours.length)]

                    newShape = {
                        sides: sides, 
                        colour: colour
                    }

                    // Check for duplicates
                    let valid = true;
                    for (let i = 0; i < shapeList.length; i++) {
                        
                        if (_.isEqual(_.pick(shapeList[i], ['sides', 'colour']), newShape)) {
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

            const tempShape = {
                x: x*i+70, 
                y: y, 
                radius: radius
            }

            newShape = {...newShape, ...tempShape}

            switch (sides) {
                case 0:
                    circle(ctx, x, y, radius);
                    ctx.translate(x*2, 0);
                    break;
                case 1:
                    regularpolygon(ctx, x, y, radius, 4, true);
                    ctx.translate(x,-y);
                    break;
                case 2:
                    break;
                default:
                    regularpolygon(ctx, x, y, radius, sides);
                    ctx.translate(x,-y);
                    break;
            }

            ctx.fillStyle = colour;
            ctx.fill();
            ctx.stokeStyle = "black"
            ctx.stroke()

            shapeList.push(newShape)
        }

        console.log(shapeList)

        canvas.onclick = function (event)
        {
            if (event.region) {
                alert("you clicked " + event.region);
            }
        }
    }, []);

    return (
        <div className="ShapeGame">
            <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight}
            />
        </div>
    )
}