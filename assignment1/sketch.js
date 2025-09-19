// Assignment 1: Shuhe Huang's Geometric Abstraction
// Reproduction of an abstract painting with custom color palette
// Requirements: multiple shapes, variables, beginShape/vertex/endShape, 
// color variables, scalable design

// custom color palette (picked from Adobe Color)
let palette = ["#E05C49", "#739E8B", "#6ADEA9", "#89736F", "#4D5E57", "#342422", "#DFDCD4"];

function setup() {
  // set canvas size to always fit the browser window
  createCanvas(windowWidth, windowHeight); 
}

function draw() {
  // background color
  // I used map() here so the background color changes with the mouse position. 
  // mouseX goes from 0..width, but I remap it into 0..255, which is the valid color range.
  // This way, when the mouse moves left to right, the background fades from black to white. 
  // Reference: https://p5js.org/reference/p5/map/
  let bg = map(mouseX, 0, width, 0, 255);
  background(bg);
  

  // some helper variables so code is easier to read
  let margin = width * 0.05;  
  let halfW = width / 2;
  let halfH = height / 2;

  // --- Main blue cross ---
  // these two big rectangles form the cross in the middle
  fill(palette[1]); 
  noStroke();
  rect(halfW - width * 0.05, 0, width * 0.07, height); // vertical bar
  rect(width / 4, halfH - height * 0.05, width, height * 0.07); // horizontal bar
  
  // extra polygon piece to make the diagonal cut
  beginShape();
  vertex(width * 0.1, height*0.37);  
  vertex(width / 4, halfH - height * 0.05);  
  vertex(width / 3.9, halfH - height * 0.05);
  vertex(width / 4, halfH + height * 0.02); 
  vertex(width * 0.082, halfH - height * 0.07); 
  endShape(CLOSE);
  
  // --- Red cross (top left small one) ---
  stroke(palette[1]);
  strokeWeight(4);
  line(0, halfH * 0.3, halfW * 0.3, halfH * 0.3);
  line(halfW * 0.11, halfH * 0.2, halfW * 0.11, halfH * 0.4);
  
  // --- Top left diagonal black shape ---
  fill(palette[5]); 
  noStroke();
  beginShape();
  vertex(width * 0.15, 0);  
  vertex(width * 0.21, 0);  
  vertex(width * 0.1, height*0.37); 
  vertex(width * 0.05, height*0.349); 
  endShape(CLOSE);

  // --- Top left yellow circle (interactive) ---
  // this circle rotates and scales with the mouse
  //reference: push(), pop() → [https://p5js.org/reference/p5/push/][https://p5js.org/reference/p5/pop/]
  // reference: translate(), rotate(), scale() → [https://p5js.org/reference/p5/translate/][https://p5js.org/reference/p5/rotate/][https://p5js.org/reference/p5/scale/]
  push(); 
  // push() is like "save the canvas settings right now", so the changes (move, rotate, scale) won't mess up other shapes.
  translate(halfW * 0.62, halfH * 0.61); // move the drawing origin (0,0) to the circle’s center

  let angle = map(mouseX, 0, width, 0, TWO_PI); 
  // map mouseX (0 → canvas width) into an angle (0 → 2*PI radians)
  // this way moving the mouse left/right makes the circle rotate
  rotate(angle);
  // rotate the coordinate system by that angle

  let s = map(mouseY, 0, height, 0.5, 1.5); 
  // map mouseY (0 → canvas height) into a scale factor (0.5 → 1.5)
  // so moving the mouse up/down makes the circle shrink or grow
  scale(s);
  // actually scale the shape by that factor

  noFill();
  stroke(palette[2]);
  strokeWeight(6 / s); // "fix" line thickness while scaling
  ellipse(0, 0, width * 0.17); // draw at (0,0) because we already moved
  pop();
  // pop() is like "go back to the saved canvas settings"
  // so the translate/rotate/scale only affect this circle

  // --- Top right red circle + blue cross (interactive circle) ---
  push();
  translate(halfW * 1.8, halfH * 0.45); // move to circle center

  let angle1 = map(mouseX, 0, width, 0, PI); // rotate half circle range
  rotate(angle1);

  let s1 = map(mouseY, 0, height, 0.5, 1.5); // scale factor
  scale(s1);

  noFill();
  stroke(palette[0]);
  strokeWeight(6 / s1);
  ellipse(0, 0, width * 0.13);
  pop();

  // blue cross lines
  stroke(palette[1]);
  line(halfW * 1.4, halfH * 0.33, halfW * 1.7, halfH * 0.33);
  line(halfW * 1.55, halfH * 0.05, halfW * 1.55, halfH * 0.48);

  // --- Slanted black rectangle (top right) ---
  stroke(palette[5]);
  noFill();
  beginShape();
  vertex(halfW * 1.45, halfH * 0.55);
  vertex(halfW * 1.65, halfH * 0.55);
  vertex(halfW * 1.85,  halfH - height * 0.05);
  vertex(halfW * 1.65,  halfH - height * 0.05);
  endShape(CLOSE);

  // --- Bottom left black rectangle ---
  fill(palette[5]);
  noStroke();
  rect(0, halfH * 1.04, halfW * 0.5, halfH * 0.9);

  // --- Green parallelogram (bottom left, interactive scaling) ---
  push(); 
  translate(halfW * 0.7, halfH * 1.7); // move to shape center

  let s2 = map(mouseY, 0, height, 0.1, 0.7); // scale with mouseY
  scale(s2);
  fill(palette[2]);

  beginShape();
  vertex(-width * 0.14, -height * 0.2);
  vertex( width * 0.05, -height * 0.2);
  vertex( width * 0.14,  height * 0.15);
  vertex(-width * 0.05,  height * 0.15);
  endShape(CLOSE);
  pop();

  // --- Bottom left red cross ---
  stroke(palette[0]);
  strokeWeight(6);
  line(halfW * 0.505, halfH * 1.25, halfW * 0.85, halfH * 1.25);
  line(halfW * 0.68, halfH * 1.1, halfW * 0.68, halfH * 1.37);

  // --- Bottom left slanted white rect with yellow line ---
  stroke(255);
  noFill();
  beginShape();
  vertex(halfW * 0.25, halfH * 1.15);
  vertex(halfW * 0.45, halfH * 1.15);
  vertex(halfW * 0.3, halfH * 1.6);
  vertex(halfW * 0.1, halfH * 1.6);
  endShape(CLOSE);

  stroke(palette[2]);
  line(halfW * 0.13, halfH * 1.25, halfW * 0.495, halfH * 1.25);

  // --- Bottom right green cross ---
  fill(palette[0]); 
  noStroke();
  rect(width * 0.75, height * 0.58, width * 0.07, height * 0.33); 
  rect(width * 0.75, height * 0.7, width * 0.33, height * 0.07);
  beginShape();
  vertex(width * 0.52, height * 0.66);  
  vertex(width * 0.75, height * 0.7);   
  vertex(width * 0.75, height * 0.7);   
  vertex(width * 0.75, height * 0.7 + height * 0.07);
  vertex(width * 0.52, height * 0.66 + height * 0.07); 
  endShape(CLOSE);
  
  // --- Bottom right black cross ---
  stroke(palette[5]);
  strokeWeight(6);
  line(halfW * 1.3, halfH * 1.25, width, halfH * 1.25);
  line(halfW * 1.85, halfH * 1.048, halfW * 1.85, halfH * 1.76);
  
  // --- Bottom frame (gray) ---
  noStroke();
  fill(palette[3]);
  rect(0, height * 0.95, width, height * 0.07);

  // --- Top frame (gray) ---
  fill(palette[3]);
  rect(0, 0, width, height * 0.07);
}

// redraw canvas if window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// This drawing replicates the structure of a abstract painting:
// "FOUR SPACES WITH BROKEN CROSS, plate 14 from ART D'AUJOURD'HUI, MAÎTRES DE L'ART ABSTRAIT: Album I."
// Link: [https://artsandculture.google.com/asset/four-spaces-with-broken-cross-plate-14-from-art-d-aujourd-hui-ma%C3%8Etres-de-l-art-abstrait-album-i-0003/igGdXWACZo2CDQ
// I applied a custom color palette and flexible geometry based on width and height properties,
// so the layout is the representation of a pattern scale up or down.
//To improve the interactive aspect I added more four: yellow circle, red circle, and green parallelogram now rotating or resizing based on the mouse movement.
//For this I used more p5.js functions are:
//translate() [https://p5js.org/reference/p5/translate/],
//rotate() [https://p5js.org/reference/p5/rotate/],
//scale() [https://p5js.org/reference/p5/scale/],
//map() [https://p5js.org/reference/p5/map/],
//and windowResized() [https://p5js.org/reference/p5/windowResized/].
//With these, I was able to translate (move) the origin of the drawing, rotate polygons, scale shapes relative to the mouse’s location, and even have the canvas respond to window resizing automatically.//
// There are comments above every almost every block of code that explains what it's doing. 