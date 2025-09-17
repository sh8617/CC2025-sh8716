function setup() {
  createCanvas(windowWidth, windowHeight); // create a canvas that fits the window
  noLoop(); // only draw once, no loop
}

function draw() {
  background(220); // light gray background

  // draw a circle
  stroke(0);            // black outline
  strokeWeight(5);      // outline thickness
  fill(255, 0, 0);      // red fill
  circle(100, 100, 80); 
  // x, y, diameter

  // draw a rectangle
  stroke(0, 0, 255);    // blue outline
  strokeWeight(6);      
  fill(0, 255, 0);      // green fill
  rect(200, 200, 100, 80); 
  // x, y, width, height

  // draw an ellipse
  stroke(255, 165, 0);  // orange outline
  strokeWeight(7);
  fill(255, 255, 0);    // yellow fill
  ellipse(400, 170, 100, 70); 
  // x, y, width, height
}
