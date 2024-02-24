import Shape from "./shape";
import Hexagon from "./hexagon";
import Circle from "./circle";
import Collider from "./collider";


export default class Triangle extends Shape {

    constructor(x, y, r, vx, vy, windowAABB) {
        super(x - r, y - r, 2 * r, 2 * r, vx, vy, windowAABB);
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
                
                this.vx *= -1;
                this.vy *= -1;
                shape.vx *= -1;
                shape.vy *= -1;
                //this.vx = [shape.vx, shape.vx = this.vx][0];
                //this.vy = [shape.vy, shape.vy = this.vy][0];

                this.numLives -= 1
                shape.numLives -= 1
                return;
            }
        })
    }

    tryCollideGeometry(shape) {
        if (shape instanceof Hexagon) {
            return Collider.collideTriangleWithHexagon(this, shape);
        } else if (shape instanceof Circle) {
            return Collider.collideCircleWithTriangle(shape, this);
        } else if (shape instanceof Triangle) {
            return Collider.collideTriangleWithTriangle(this, shape);
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
                color = '#fc03c6';
                break;
            case 2: 
                color = '#3250a8';
                break; 
            case 1: 
                color = '#a83232';
                break;
            default:
                return;
        }
        
        // TODO: see what happens if the preservation of oldStyle is removed 
        const oldStyle = context.fillStyle;
        
        context.beginPath();
        context.moveTo(this.vertices[0].x, this.vertices[0].y); 
        context.lineTo(this.vertices[1].x, this.vertices[1].y);
        context.lineTo(this.vertices[2].x, this.vertices[2].y);
        context.closePath();
        context.fillStyle = color;
        context.fill();

        context.fillStyle = oldStyle;
    }
}