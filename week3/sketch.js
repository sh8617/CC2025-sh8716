// variable declaration
// "let" is a keyword that allows you to declare you varible
// in the below example, a new variable is being created
// called "circleSize" wich is storing a number (125)

// below are GLOBAL variables; they are accessible by any block of code
let circleSize //variable to store circle size
let redColor="rgba(35, 179, 90, 0.7)"

function setup() {// runs once at startup
  createCanvas(windowWidth, windowHeight);// set a 400px by 400ps canvas
  circleSize=width*0.35
}

function draw() {

  console.log(mouseX/width + " " +mouseX/height)
  // a grayscale color is denoted as a number 0-255
  // an rgb color is denoted as 3 numbers (red green blue)
  // background{127,0,0}
  // we can use the name of a color like "black" or "olive"
  // background("aqua")

  background("rgba(180, 114, 114, 1)");

  noStroke();
  fill("");
  rect(0,0,width/2,height/2);
  rect(width/2,height/2,width/2,height/2);

  //stroke and fill change the color of drawn shapes
  stroke("rgba(218, 213, 64, 0.91)")
  fill("rgba(72, 211, 37, 0.74)")


  strokeWeight(5)
  //noStroke(): gets rid of the stroke completely
  //noFill(): gets rid of the fill completely

  //circle takes 3 parameters: x, y and d
  circle(200,100,50);

  //setting a new fill for m rectangle
  fill("rgba(31, 176, 46, 0.87)")
  //rect takes 4 parameters
  //x coord of top left, y coord of top left, width and height
  rect(100,300,150,50);
  //ellipse takes 4 parameters
  //x coord of center, y coord of center, width and height
  ellipse(250,80,10,20);

  //line  connects two coords: x1,x2,x3,x4
  line(250,130,260,130)

  //to draw complex polygons (more than 2 coords)
  //create a beginShape(); function and a endShape function
  //any vertex(x,y) functionsyou place inbetween beginShape and endShape
  //will be rendered as points in a compleye polygon
  beginShape()
  vertex(100,100)//leftmost coordinate
  vertex(200,100)//top right coordinate
  vertex(100,150)//bottom-most coordinate
  endShape(CLOSE)//Close parameter closes the polygon

  fill("rgba(194, 27, 27, 1)")
  //circle(width/2,height/2,width/2.75)
  //ellipse(mouseX,mouseY,mouseX,mouseY)
  
  // arcs are like ellipses, except they have two extra parameters
  // start and end, which are peovided in RADIANS format
  // you can convert degrees to radians using the radians() function
  arc(width/2,height*0.75,100,100,-PI/2,PI/2)
  arc(100,200,100,100,radians(30-mouseX),radians(330+mouseX),PIE)
}
