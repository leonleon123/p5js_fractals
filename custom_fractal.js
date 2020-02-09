const w = 1000, h = 700;
const strokeW = 2;
let offsetH = h/3;
let points = [{x:0, y:0}, {x:w, y:0}];
let maxIter = 5;

function setup(){
    createCanvas(w, h);
    background(0);
}

function draw(){
    background(0);
    stroke(255);
    translate(0,h-offsetH);
    strokeWeight(strokeW);
    transformations(maxIter);
}

function mousePressed(){
    points.push({x:mouseX, y:mouseY-h+offsetH});
    points.sort((a,b)=>a.x-b.x);
}

function drawPoints(){
    for(let i = 0; i < points.length-1; i++) 
        line(points[i].x, points[i].y, points[i+1].x, points[i+1].y);
}

function transformations(iter){
    drawPoints();
    if(iter>0){
        let main = createVector(points[points.length-1].x, points[points.length-1].y);
        for(let i = 0; i < points.length-1; i++){
            push();
            let a = createVector(points[i+1].x-points[i].x, points[i+1].y-points[i].y);
            translate(points[i].x, points[i].y);
            rotate(main.angleBetween(a));
            scale(a.mag()/main.mag());
            strokeWeight(Math.pow(strokeW, maxIter-iter));
            transformations(iter-1);
            pop();
        }
    }
}