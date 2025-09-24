function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background("rgba(220, 181, 181, 1)");
  circle(100, 100, 100);
  circle(85, 90, 5);
  circle(115, 90, 5);
  arc(100, 100, 60, 60, 0, PI);
  //translate is a Transformation function
  // it moves the coordinate matrix according to
  //a new set of coordinates, which
  //the "new" 0,0

  //push and pop isolate a transformation
  //anything enclosed within push and pop only applies
  //within that enclosure
  push(); // push indicates the beginning of an isolate block
  fill("pink");
  translate(100, 100);
  circle(0, 0, 100);
  circle(100, 100, 100);
  circle(85, 90, 5);
  circle(115, 90, 5);
  arc(100, 100, 60, 60, 0, PI);
  pop(); // pop indicates the end of an isolated block
  //text function； text, x, y off top left corner
  angle = map(mouseX, 0, width, 0, 360);
  push();
  rotate(radians(mouseX));
  strokeWeight(4);
  stroke(0);
  line(0, 0, 100, 0);
  pop();

  if (condition) {
  } else {
  }

  text(mousenX + "," + mouseY, 5, 15);
}
