import Shape from "./shape";
import Triangle from "./triangle";
import Circle from "./circle";


export default class Hexagon extends Shape {
    
    constructor(x, y, r, vx, vy, windowAABB) {
        super(x - r, y - r, 2 * r, 2 * r, vx, vy, windowAABB);
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
            this.vertices.push(
                {
                    x: x + dx,
                    y: y + dy
                }
            );
        }
    }
    

    tryCollide(otherShapesList) {
        otherShapesList.forEach(shape=>{
            //if (this.AABB.intersects(shape.AABB)) {
            if (this.AABB.intersects(shape.AABB) && this.tryCollideGeometry(shape)) {
                if (this.numLives < 1 || shape.numLives < 1) {
                    return;
                } 

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
        if (this.numLives < 1) {
            return;
        } 

        if (!this.windowAABB.intersects(this.AABB)) {
            this.vx *= -1;
            this.vy *= -1;
        }
        
        for (let i = 0; i < this.numVertices; i++) {
            this.vertices[i].x += this.vx; 
            this.vertices[i].y += this.vy; 
        }

        this.AABB.x += this.vx;
        this.AABB.y += this.vy;
    }

    
    draw(context) {
        let color = '#000000'
        switch (this.numLives) {
            case 3:
                color = '#03fc24';
                break;
            case 2: 
                color = '#fcba03';
                break; 
            case 1: 
                color = '#a83232';
                break;
            default:
                return;
        }
        
        const oldStyle = context.fillStyle;
        
        context.beginPath();
        context.moveTo(this.vertices[0].x, this.vertices[0].y); 
        context.lineTo(this.vertices[1].x, this.vertices[1].y);
        context.lineTo(this.vertices[2].x, this.vertices[2].y);
        context.lineTo(this.vertices[3].x, this.vertices[3].y);
        context.lineTo(this.vertices[4].x, this.vertices[4].y);
        context.lineTo(this.vertices[5].x, this.vertices[5].y);
        context.lineTo(this.vertices[0].x, this.vertices[0].y);
        context.closePath();
        context.fillStyle = color;
        context.fill();
        context.stroke();

        context.fillStyle = oldStyle;
    }
}