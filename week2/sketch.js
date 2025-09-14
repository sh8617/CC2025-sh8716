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
