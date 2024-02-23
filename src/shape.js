import Rectangle from "./rectangle"

export default class Shape {
    constructor(x, y, w, h, vx, vy) {
        this.AABB = Rectangle(x, y, w, h, vx, vy)
        this.numLives = 3
    }

    update(otherShapesList) {
        otherShapesList.forEach(shape=>{
            if (!shouldSkipCollisionCheck(shape) && tryCollide(shape)) {
                this.vx = [shape.vx, shape.vx = this.vx][0];
                this.vy = [shape.vy, shape.vy = this.vy][0];

                this.numLives -= 1
                shape.numLives -= 1
                return;
            }
        })
        
    }

    shouldSkipCollisionCheck(otherShape) {
        // TODO: skip collision of otherShape equals to this shape
    }

    tryCollide(otherShape) {
        return false;
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
        
        const style = context.fillStyle;
        context.fillStyle = color;

        context.beginPath();
        
        //context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);

        context.fill();
        context.stroke();

        context.fillStyle = style;
    }
}