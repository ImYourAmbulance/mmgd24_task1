import Shape from "./shape";
import Hexagon from "./hexagon";
import Triangle from "./triangle";


export default class Circle extends Shape {
    
    constructor(x, y, r, vx, vy) {
        this.x = x
        this.y = y
        this.r = r

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
        if (shape instanceof Hexagon) {
            return false;
        } else if (shape instanceof Triangle) {
            return false;
        }
        return false;
    } 


    update() {
        this.x += this.vx;
        this.y += this.vy;
    }


    draw(context) {
        let color = '#000000'
        switch (this.numLives) {
            case 3:
                color = '#00ff00';
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