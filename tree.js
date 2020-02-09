const w = 700, h = 700;
let colored = true;
function setup() {
  createCanvas(w, h);
}

function mousePressed(){
  colored = !colored;
}

function draw() {
  background(0);
  stroke(colored?color(`hsl(${Math.round((mouseY/h)*345)}, 100%, 50%)`):255);
  translate(w/2,h);
  let angle = (mouseX/400)*PI;
  tree(10, angle);
  tree(10, -angle);
}

function tree(i,a){
  if(i==0) return;
  push();
  line(0,0,0,-h/4);
  translate(0,-h/4);
  rotate(a);
  scale(0.7);
  tree(i-1,a);
  tree(i-1,-a);
  pop();
}