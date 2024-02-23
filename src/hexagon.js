import Shape from "./shape";
import Triangle from "./triangle";
import Circle from "./circle";


export default class Hexagon extends Shape {
    
    constructor(x, y, r, vx, vy) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.vx = vx;
        this.vy = vy;
        this.vertices = [];
        
        this.numVertices = 6;
        const step = (2 * Math.PI) / this.numVertices;
        const start = 0;
        for (let i = 0; i < this.numVertices; i++) {
            let alpha = start + i * step; 
            let dx = Math.cos(alpha) * r;
            let dy = Math.sin(alpha) * r;
            this.vertices[i] = (x + dx, y + dy)
        }

        super(x - r, y - r, 2 * r, 2 * r, vx, vy);
    }
    

    tryCollide(otherShapesList) {
        otherShapesList.forEach(shape=>{
            if (this.AABB.intersects(otherShape.AABB) && tryCollideGeometry(shape)) {
                this.vx = [shape.vx, shape.vx = this.vx][0];
                this.vy = [shape.vy, shape.vy = this.vy][0];

                this.numLives -= 1
                shape.numLives -= 1
                return;
            }
        })
    }


    tryCollideGeometry(shape) {
        if (shape instanceof Circle) {
            return false;
        } else if (shape instanceof Triangle) {
            return false;
        }
        return false;
    }


    update() {
        for (let i = 0; i < this.numVertices; i++) {
            this.vertices[i] += (this.vx, this.vy); 
        }
    }

    
    draw(context) {
        let color = '#000000'
        switch (this.numLives) {
            case 3:
                color = '#3250a8';
                break;
            case 2: 
                color = '#a83232';
                break; 
            case 1: 
                color = '#54a832';
                break;
            default:
                return;
        }
        
        const oldStyle = context.fillStyle;
        
        context.beginPath();
        context.moveTo(vertices[0]); 
        context.lineTo(vertices[1]);
        context.lineTo(vertices[2]);
        context.lineTo(vertices[3]);
        context.lineTo(vertices[4]);
        context.lineTo(vertices[5]);
        context.closePath();
        context.fillStyle = color;
        context.fill();

        context.fillStyle = oldStyle;
    }
}