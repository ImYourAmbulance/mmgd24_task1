
import Shape from "./shape";
import Hexagon from "./hexagon";
import Circle from "./circle";


export default class Triangle extends Shape {

    constructor(x, y, r, vx, vy) {
        this.x = x
        this.y = y
        this.r = r
        this.vx = vx
        this.vy = vy
        this.vertices = []
        
        this.numVertices = 3;
        const step = (2 * Math.PI) / this.numVertices;
        const start = Math.PI / 2;
        for (let i = 0; i < this.numVertices; i++) {
            let alpha = start + i * step; 
            let dx = Math.cos(alpha) * r;
            let dy = Math.sin(alpha) * r;
            this.vertices[i] = (x + dx, y + dy)
        }

        super(x - r, y - r, 2 * r, 2 * r, vx, vy);
    }


    update() {
        for (let i = 0; i < this.numVertices; i++) {
            this.vertices[i] += (this.vx, this.vy); 
        }
    }


    tryCollideGeometry(shape) {
        if (shape instanceof Hexagon) {
            return false;
        } else if (shape instanceof Circle) {
            return false;
        }
        return false;
    }


    draw(context) {
        let color = '#000000'
        switch (this.numLives) {
            case 3:
                // Green
                color = '#54a832';
                break;
            case 2: 
                // Sky blue
                color = '#3250a8';
                break; 
            case 1: 
                // Redish
                color = '#a83232';
                break;
            default:
                return;
        }
        
        // TODO: see what happens if the preservation of oldStyle is removed 
        const oldStyle = context.fillStyle;
        
        context.beginPath();
        context.moveTo(vertices[0]); 
        context.lineTo(vertices[1]);
        context.lineTo(vertices[2]);
        context.closePath();
        context.fillStyle = color;
        context.fill();

        context.fillStyle = oldStyle;
    }
}