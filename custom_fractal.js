const w = 1000, h = 700;
const strokeW = 1.7;
let offsetH = h/3;
let points = [{x:0, y:0}, {x:w, y:0}];
let maxIter = 4;
let chainMode = false;
let colored = false;

let chainMode_btn;
let colored_btn;
function setup(){
    createCanvas(w, h);
    chainMode_btn = createButton("chain mode");
    colored_btn = createButton("colored");

    colored_btn.mousePressed(()=> colored= !colored);
    chainMode_btn.mousePressed(()=>chainMode= !chainMode);
}

function draw(){
    background("#502968");
    stroke(255);
    translate(0,h-offsetH);
    strokeWeight(strokeW);
    transformations(maxIter);
}

function mousePressed(){
    if(mouseX > 0 && mouseX < w && mouseY > 0 && mouseY < h){
        if(chainMode)
            points = [{x:0, y:0}, ...points.slice(1,points.length-1),{x:mouseX, y:mouseY-h+offsetH}, {x:w, y:0}];
        else{
            points.push({x:mouseX, y:mouseY-h+offsetH});
            points.sort((a,b)=>a.x-b.x);
        }
    }
}

function drawPoints(){
    
    for(let i = 0; i < points.length-1; i++) 
        line(points[i].x, points[i].y, points[i+1].x, points[i+1].y);
}

function transformations(iter){
    drawPoints();
    if(colored) stroke(color(`hsl(${int(iter*380/maxIter)},100%, 50%)`));
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