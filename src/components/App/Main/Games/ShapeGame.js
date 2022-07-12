import { useState, useRef, useEffect } from "react"
import _ from "lodash";

export default function ShapeGame () {

    const questionCanvasRef = useRef(null);
    const answerCanvasRef = useRef(null);

    const colours = ["blue", "red", "yellow", "green", "orange", "purple"]
    const shapeCount = 5;

    const topShapes = [];
    const bottomShapes = [];

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

    function generateRandomShape(topShapes) {
        let newShape = {}
        while (true) {
            const sides = Math.floor(Math.random() * 7)
            const colour = colours[Math.floor(Math.random() * colours.length)]

            newShape = {
                sides: sides, 
                colour: colour
            }

            // Check for duplicates
            let valid = true;
            for (let i = 0; i < topShapes.length; i++) {
                if (_.isEqual(_.pick(topShapes[i], ['sides', 'colour']), newShape)) {
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

    function drawShapeList (ctx, x, y, radius) {
        for (let i = 0; i < shapeCount; i++) {            
            let newShape = generateRandomShape(topShapes)

            const tempShape = {
                x: x*(i+1), 
                y: y, 
                radius: radius
            }

            newShape = {...newShape, ...tempShape}

            switch (newShape.sides) {
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
                    regularpolygon(ctx, x, y, radius, newShape.sides);
                    ctx.translate(x,-y);
                    break;
            }

            ctx.fillStyle = newShape.colour;
            ctx.fill();
            ctx.stokeStyle = "black"
            ctx.stroke()

            topShapes.push(newShape)
        }
    }

    useEffect(() => {
        const canvas = questionCanvasRef.current;
        const ctx = canvas.getContext('2d') 

        const centerY = canvas.height / 2;

        ctx.beginPath();
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.stroke();

        const y = centerY

        const scale = Math.min((canvas.width / 800), 2.4);
        ctx.scale(scale, scale);

        const x = 80
        const radius = 50
        
        const offset = 160 - ((shapeCount - 3) * x)
        ctx.translate(offset, 0)

        drawShapeList(ctx, x, y, radius);

        canvas.addEventListener('click', (e) => {
            const mousePos = {
                x: e.clientX - canvas.offsetLeft,
                y: e.clientY - canvas.offsetTop,
            };
            console.log(mousePos)
        })
    }, []);

    return (
        <div className="ShapeGame">
            <canvas ref={questionCanvasRef} width={window.innerWidth - 16} height={window.innerHeight * 0.35}/>
            <canvas ref={answerCanvasRef} width={window.innerWidth - 16} height={window.innerHeight * 0.35}/>
        </div>
    )
}