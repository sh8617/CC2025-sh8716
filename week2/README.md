# Week 2 Assignment

## What I did
For this week's task, I added three shapes to the original class code:
- A circle at (100, 100) with diameter 80.
- A rectangle at (200, 200) with width 120 and height 60.
- An ellipse at (400, 150) with width 100 and height 50.
- I also wrote comments in English to describe every line of code. 
- “It’s kind of like drawing with math,” where each one is driven by numbers.

## Code
function setup() {
  createCanvas(windowWidth, windowHeight); // create a canvas that fits the window
  noLoop(); // only draw once, no loop
}

function draw() {
  background(220); // light gray background

  // draw a circle
  circle(100, 100, 80); 
  // x, y, diameter

  // draw a rectangle
  rect(200, 200, 120, 60); 
  // x, y, width, height

  // draw an ellipse
  ellipse(400, 150, 100, 50); 
  // x, y, width, height
}