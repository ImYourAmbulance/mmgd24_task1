import Shape from "./shape";
import Hexagon from "./hexagon";
import Circle from "./circle";
import Triangle from "./triangle";

export default class Collider { 

    constructor() {}

    static collideCircleWithCircle(c1, c2) {
        return this.dist(c1, c2) <= c1.r + c2.r 
    }


    static collideCircleWithTriangle(c, t) {
        return this.polygonCircle(t, c);

    }


    static collideCircleWithHexagon(c, h) {
        return this.polygonCircle(h, c);

    }


    static collideTriangleWithTriangle(t1, t2) {
        return this.polygonPolygon(t1, t2);

    }


    static collideTriangleWithHexagon(t, h) {
        return this.polygonPolygon(t, h);
    }


    static collideHexagonWithHexagon(h1, h2) {
        return this.polygonPolygon(h1, h2);
    }


    static dist(p1, p2) {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        return Math.sqrt(dx * dx + dy * dy);
    }


    static polygonCircle(p, c) {
        const vx = p.vertices;

        if (this.polygonPoint(p, c))
            return true;

        let next = 0;
        for (let current = 0; current < vx.length; current++) {
            next = current + 1;

            if (next === vx.length)
                next = 0;

            const vc = vx[current]; 
            const vn = vx[next]; 

            if (this.lineCircle(vc, vn, c))
                return true;
        }

        return false;
    }


    static polygonPoint(poly, p) {
        const vx = poly.vertices;
        let collision = false;

        let next = 0;
        for (let current = 0; current < vx.length; current++) {
            next = current + 1;
            if (next === vx.length)
                next = 0;

            const vc = vx[current];
            const vn = vx[next]; 

            if (((vc.y >= p.y && vn.y < p.y) || (vc.y < p.y && vn.y >= p.y)) &&
                (p.x < (vn.x - vc.x) * (p.y - vc.y) / (vn.y - vc.y) + vc.x))
                collision = !collision;
        }
        return collision;
    }


    static polygonLine(p, p1, p2) {
        const vx = p.vertices;

        let next = 0;
        for (let current = 0; current < vx.length; current++) {
            next = current + 1;

            if (next === vx.length)
                next = 0;

            const p3 = vx[current]; 
            const p4 = vx[next]; 

            if (this.lineLine(p1, p2, p3, p4))
                return true;
        }
        return false;
    }


    static pointCircle(p, c) {
        const dist = this.dist(c, p);

        if (dist <= c.r)
            return true;

        return false;
    }


    static pointLine(p, p1, p2) {
        const d1 = this.dist(p, p1);
        const d2 = this.dist(p, p2);

        const len = this.dist(p1, p2);
        const buf = 0.1; 
        if (len - buf <= d1 + d2 && d1 + d2 <= len + buf)
            return true;

        return false;
    }


    static lineCircle(p1, p2, c) {
        const inside1 = this.pointCircle(p1, c);
        const inside2 = this.pointCircle(p2, c);

        if (inside1 || inside2)
            return true;

        const len = this.dist(p2, p1);
        const dot = (((c.x - p1.x) * (p2.x - p1.x)) + ((c.y - p1.y) * (p2.y - p1.y))) / (len * len);

        const closest = {
            x: p1.x + (dot * (p2.x - p1.x)),
            y: p1.y + (dot * (p2.y - p1.y))
        };

        if (!this.pointLine(closest, p1, p2))
            return false;

        const dist = this.dist(closest, c);

        if (dist <= c.r)
            return true;

        return false;
    }

    static lineLine(p1, p2, p3, p4) {
        const uA = ((p4.x - p3.x) * (p1.y - p3.y) - (p4.y - p3.y) * (p1.x - p3.x))
            / ((p4.y - p3.y) * (p2.x - p1.x) - (p4.x - p3.x) * (p2.y - p1.y));

        const uB = ((p2.x - p1.x) * (p1.y - p3.y) - (p2.y - p1.y) * (p1.x - p3.x))
            / ((p4.y - p3.y) * (p2.x - p1.x) - (p4.x - p3.x) * (p2.y - p1.y));

        if (0 <= uA && uA <= 1 && 0 <= uB && uB <= 1)
            return true;

        return false;
    }


    static polygonPolygon(p1, p2) {
        if (this.polygonPoint(p2, p1))
            return true;

        if (this.polygonPoint(p1, p2))
            return true;

        const vx = p1.vertices;

        let next = 0;
        for (let current = 0; current < vx.length; current++) {
            next = current + 1;

            if (next === vx.length)
                next = 0;

            const vc = vx[current]; 
            const vn = vx[next];

            if (this.polygonLine(p2, vc, vn))
                return true;
        }
        return false;
    }
}