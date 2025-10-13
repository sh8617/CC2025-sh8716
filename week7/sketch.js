let pX = 0; // these are my origin points!
let pY = 0;
let targetX = 0; // these are my destination points!
let targetY = 0;
let currentX = 0; // these are my current positions!
let currentY = 0;
// how much should i move from origin to destination (0-1)
let lerpAmt = 0; 
let speed = 0.01;

let prevSecond = 0; // variable to store the 
// time on the previous draw loop

function setup() {
  createCanvas(windowWidth, windowHeight);
  pX = random(width);
  pY = random(height);
  targetX = random(width);
  targetY = random(height);
}

function draw() {
  background(255);
  currentX = lerp(pX,targetX,lerpAmt);
  currentY = lerp(pY,targetY,lerpAmt);
  fill(255); // white
  circle(currentX,currentY,20);
  lerpAmt=lerpAmt+speed;
  // constrain is a function that keeps a 
  // value between a certain range
  // it takes 3 parameters: the value, the low limit,
  // and the high limit
  lerpAmt = constrain(lerpAmt,0,1);

  if(prevSecond != second()){ // this block runs once a second
    prevSecond = second();
    targetX = random(width);
    targetY = random(height);
    lerpAmt = 0;
    pX = currentX;
    pY = currentY;
  }
}