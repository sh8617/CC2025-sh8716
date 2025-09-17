

function setup() {// runs once at startup
  createCanvas(400, 400);// set a 400px by 400ps canvas
  
}

function draw() {
  // a grayscale color is denoted as a number 0-255
  // an rgb color is denoted as 3 numbers (red green blue)
  // background{127,0,0}
  // we can use the name of a color like "black" or "olive"
  // background("aqua")

  background("rgba(180, 114, 114, 1)");

  //stroke and fill change the color of drawn shapes
  stroke("rgba(167, 55, 55, 0)")
  fill("rgba(0,0,0,0)")

  strokeWeight(5)
  //noStroke(): gets rid of the stroke completely
  //noFill(): gets rid of the fill completely

  //circle takes 3 parameters: x, y and d
  circle(200,100,50);

  //setting a new fill for m rectangle
  fill("rgba(201, 65, 65, 0)")
  //rect takes 4 parameters
  //x coord of top left, y coord of top left, width and height
  rect(100,300,150,50)
  //ellipse takes 4 parameters
  //x coord of center, y coord of center, width and height
  ellipse(250,80,10,20)

  //
  line(250,130,260,130)
}
