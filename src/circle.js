import Shape from "./shape";
import Hexagon from "./hexagon";
import Triangle from "./triangle";
import Collider from "./collider";

export default class Circle extends Shape {
    
    constructor(x, y, r, vx, vy, windowAABB) {
        super(x - r, y - r, 2 * r, 2 * r, vx, vy, windowAABB);
        this.x = x;
        this.y = y;
        this.r = r;
        this.vx = vx;
        this.vy = vy;
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
        if (shape instanceof Hexagon) {
            return Collider.collideCircleWithHexagon(this, shape);
        } else if (shape instanceof Triangle) {
            return Collider.collideCircleWithTriangle(this, shape);
        } else if (shape instanceof Circle) {
            return Collider.collideCircleWithCircle(this, shape);
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

        this.x += this.vx;
        this.y += this.vy;

        this.AABB.x += this.vx;
        this.AABB.y += this.vy;
    }


    draw(context) {
        let color = '#000000'
        switch (this.numLives) {
            case 3:
                color = '#a83232';
                break;
            case 2: 
                color = '#ffff00';
                break; 
            case 1: 
                color = '#ff00ff';
                break;
            default:
                return;
        }
        
        const oldStyle = context.fillStyle;
        
        context.fillStyle = color;
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        context.fill();
        context.stroke();

        context.fillStyle = oldStyle;
    }
}