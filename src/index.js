//import Shape from "./shape";
import Rectangle from "./rectangle";
import Hexagon from "./hexagon";
import Triangle from "./triangle";
import Circle from "./circle";

const canvas = document.getElementById("cnvs");

const gameState = {};

const width = window.innerWidth;
const height = window.innerHeight;

const windowAABB = new Rectangle(0, 0, width, height, 0, 0);

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}


function createShapes(shapesArray) {
    const instNum = 10;
    shapes = [];

    for (let i = 0; i < instNum; i++) {
        let vx = getRandomArbitrary(-3, 3);
        let vy = getRandomArbitrary(-3, 3);
        let minSize = 40;
        let maxSize = 60;

        shapes[i] = new Triangle(getRandomArbitrary(0, width), getRandomArbitrary(0, height), getRandomArbitrary(minSize, maxSize), vx, vy, windowAABB);
        shapes[i + instNum] = new Hexagon(getRandomArbitrary(0, width), getRandomArbitrary(0, height), getRandomArbitrary(minSize, maxSize), vx, vy, windowAABB);
        shapes[i + instNum * 2] = new Circle(getRandomArbitrary(0, width), getRandomArbitrary(0, height), getRandomArbitrary(minSize, maxSize), vx, vy, windowAABB);
    }

    return shapes;
}


function queueUpdates(numTicks) {
    for (let i = 0; i < numTicks; i++) {
        gameState.lastTick = gameState.lastTick + gameState.tickLength;
        update(gameState.lastTick);
    }
}


function draw(tFrame) {
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    gameState.shapes.forEach(shape=>{
        shape.draw(context);
    })
}


function update(tick) {
    let n = gameState.shapes.length;
    for (let i = 0; i < n; i++) {
        let currentShape = gameState.shapes[i];
        for (let j = i + 1; j < n; j++) {
            currentShape.tryCollide(gameState.shapes.slice(j));
        }
        currentShape.update();
    }
}


function run(tFrame) {
    gameState.stopCycle = window.requestAnimationFrame(run);

    const nextTick = gameState.lastTick + gameState.tickLength;
    let numTicks = 0;

    if (tFrame > nextTick) {
        const timeSinceTick = tFrame - gameState.lastTick;
        numTicks = Math.floor(timeSinceTick / gameState.tickLength);
    }
    queueUpdates(numTicks);
    draw(tFrame);
}


function stopGame(handle) {
    window.cancelAnimationFrame(handle);
}


function setup() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    gameState.lastTick = performance.now()
    gameState.tickLength = 15 //ms
    gameState.shapes = createShapes()
}


setup();
run();
