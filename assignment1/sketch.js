// Assignment 1: Shuhe Huang's Geometric Abstraction
// Requirements: multiple shapes, variables, beginShape/vertex/endShape, scalable design
// Color reference in https://kgolid.github.io/chromotome-site/
// I made some attempts in interaction: let the two circles scale according to the mouse; The overall image is written in a relative size format that can be scaled according to the window (using width/height as the ratio).


function setup() {
  // Canvas is created according to the window size, so that the composition can adapt to different screens with relative size
  createCanvas(windowWidth, windowHeight); 
}

function draw() {
  // Use map() to map mouseX (0 to width) to grayscale values of 0 to 255（ https://p5js.org/reference/p5/map/ ）
  // By moving the mouse from left to right, the background will gradually change from black to white. This interaction can make the screen less static.
  let bg = map(mouseX, 0, width, 0, 255);
  background(bg);

  // For readability, calculate some commonly used size points in advance
  let margin = width * 0.05;  // I originally intended to use this variable for the margin, but I didn't use it directly in the composition, but kept it as a holder
  let halfW = width / 2;
  let halfH = height / 2;

  // Central "cross" main shape (green)
  // Fold two long rectangles together to form a cross; All dimensions are written in width/height ratio to ensure that the composition relationship remains unchanged when the window changes.
  fill("#739E8B"); 
  noStroke();
  rect(halfW - width * 0.05, 0, width * 0.07, height);       // vertical bar
  rect(width / 4, halfH - height * 0.05, width, height * 0.07); // strip
  // These specific values were obtained through multiple experiments, including later ones
  
  // Diagonal small polygon: Use beginShape,vertex,endShape to add a diagonal edge
  // I am adjusting and looking at the values here, mainly relying on visual alignment; After being written in proportional form, changing the screen can also maintain the position relationship of this oblique edge.
  beginShape();
  vertex(width * 0.1,  height * 0.37);  
  vertex(width / 4,    halfH - height * 0.05);  
  vertex(width / 3.9,  halfH - height * 0.05);
  vertex(width / 4,    halfH + height * 0.02); 
  vertex(width * 0.082, halfH - height * 0.07); 
  endShape(CLOSE);
  
  // The thin "cross" line in the upper left corner (using the same color scheme, maintaining consistency) 
  stroke("#739E8B");
  strokeWeight(4);
  line(0, halfH * 0.3, halfW * 0.3, halfH * 0.3);
  line(halfW * 0.11, halfH * 0.2, halfW * 0.11, halfH * 0.4);
  
  // Brown diagonal quadrilateral in the upper left corner
  // Here, a solid color block is used to press down on a portion of the area, creating a front and back hierarchy. The vertices are also written in proportion.
  fill("#342422"); 
  noStroke();
  beginShape();
  vertex(width * 0.15, 0);  
  vertex(width * 0.21, 0);  
  vertex(width * 0.1,  height * 0.37); 
  vertex(width * 0.05, height * 0.349); 
  endShape(CLOSE);

  // Top left green circle
  // I want this circle to be related to the mouse, with mouseY controlling the zoom.
  // I use push()/pop() here to limit displacement, rotation, and scaling only within this circle to avoid affecting other graphics
  push(); 
  translate(halfW * 0.62, halfH * 0.61); // Move the coordinate origin to the center of this circle
  // Map mouseY from 0 to height to 0.5 to 1.5 (I have tried using 0.3 as too small and 2 as too large, the range of 0.5 to 1.5 is more stable)
  let s = map(mouseY, 0, height, 0.5, 1.5); 
  scale(s);
  // Scale ratio using scale()（ https://p5js.org/reference/p5/scale/ ）
  // I found that zooming directly will also enlarge/thicken the strokes, making them look inconsistent.
  // So write strokeWeight as 6/s, so that the line becomes thicker when zooming in and thinner when zooming in, visually maintaining a similar thickness.
  noFill();
  stroke("#6ADEA9");
  strokeWeight(6 / s);
  ellipse(0, 0, width * 0.17); // Draw on (0,0) because it has already been translated above
  pop();

  // The red circle in the upper right corner and the green line next to it
  // This red circle also has a similar interaction: mouseY controls scaling.
  push()
  translate(halfW * 1.8, halfH * 0.45);
  let s1 = map(mouseY, 0, height, 0.5, 1.5);
  scale(s1);
  noFill();
  stroke("#E05C49");
  strokeWeight(6 / s1);
  ellipse(0, 0, width * 0.13);
  pop();

  // The two green short lines on the right are used to echo the main color shape in the center
  stroke("#739E8B");
  line(halfW * 1.4,  halfH * 0.33, halfW * 1.7,  halfH * 0.33);
  line(halfW * 1.55, halfH * 0.05, halfW * 1.55, halfH * 0.48);

  // Right diagonal black box line
  // Use wireframes instead of fill colors here
  stroke("#342422");
  noFill();
  beginShape();
  vertex(halfW * 1.45, halfH * 0.55);
  vertex(halfW * 1.65, halfH * 0.55);
  vertex(halfW * 1.85, halfH - height * 0.05);
  vertex(halfW * 1.65, halfH - height * 0.05);
  endShape(CLOSE);

  // Bottom left black rectangle
  // This piece is relatively heavy, used to press down on the lower left corner to give the picture a sense of weight.
  fill("#342422");
  noStroke();
  rect(0, halfH * 1.04, halfW * 0.5, halfH * 0.9);

  // Bottom left green parallelogram (interactive scaling)
  // I want the shape in the lower left corner to have a breathing sensation with the mouseY, so I made a vertical scaling.
  // Similarly, use push/pop to limit the transformation range internally.
  push(); 
  translate(halfW * 0.7, halfH * 1.7);
  let s2 = map(mouseY, 0, height, 0.1, 0.7); // Don't set the upper limit too high here, otherwise it will block too much
  scale(s2);
  fill("#6ADEA9");
  beginShape();
  vertex(-width * 0.14, -height * 0.2);
  vertex( width * 0.05, -height * 0.2);
  vertex( width * 0.14,  height * 0.15);
  vertex(-width * 0.05,  height * 0.15);
  endShape(CLOSE);
  pop();

  // Bottom left red cross
  // Make it more like a "mark" with line width to remind that there is a boundary point here
  stroke("#E05C49");
  strokeWeight(6);
  line(halfW * 0.505, halfH * 1.25, halfW * 0.85,  halfH * 1.25);
  line(halfW * 0.68,  halfH * 1.1,  halfW * 0.68,  halfH * 1.37);

  // Bottom left white box and green line above it
  stroke(255);
  noFill();
  beginShape();
  vertex(halfW * 0.25, halfH * 1.15);
  vertex(halfW * 0.45, halfH * 1.15);
  vertex(halfW * 0.3,  halfH * 1.6);
  vertex(halfW * 0.1,  halfH * 1.6);
  endShape(CLOSE);

  stroke("#6ADEA9");
  line(halfW * 0.13, halfH * 1.25, halfW * 0.495, halfH * 1.25);

  // Red cross at the bottom right (solid heart block)
  // Create a block intersection in the lower right corner and compare it with the white box in the lower left corner.
  fill("#E05C49"); 
  noStroke();
  rect(width * 0.75, height * 0.58, width * 0.07, height * 0.33); 
  rect(width * 0.75, height * 0.7,  width * 0.33, height * 0.07);
  beginShape();
  vertex(width * 0.52, height * 0.66);  
  vertex(width * 0.75, height * 0.7);   
  vertex(width * 0.75, height * 0.7);   
  vertex(width * 0.75, height * 0.7 + height * 0.07);
  vertex(width * 0.52, height * 0.66 + height * 0.07); 
  endShape(CLOSE);
  
  // Black "cross" line at the bottom right
  stroke("#342422");
  strokeWeight(6);
  line(halfW * 1.3,  halfH * 1.25, width, halfH * 1.25);
  line(halfW * 1.85, halfH * 1.048, halfW * 1.85, halfH * 1.76);
  
  // Brown box above and below
  noStroke();
  fill("#89736F");
  rect(0, height * 0.95, width, height * 0.07);
  fill("#89736F");
  rect(0, 0, width, height * 0.07);
}

// When the window size changes, readjust the canvas size
// I want my work to maintain consistent proportional relationships on different screens, so I used this function.
// When the window size changes, the system will call it.（https://p5js.org/reference/p5/windowResized/）
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// This drawing replicates the structure of a abstract painting:
// "FOUR SPACES WITH BROKEN CROSS, plate 14 from ART D'AUJOURD'HUI, MAÎTRES DE L'ART ABSTRAIT: Album I."
// Link: [https://artsandculture.google.com/asset/four-spaces-with-broken-cross-plate-14-from-art-d-aujourd-hui-ma%C3%8Etres-de-l-art-abstrait-album-i-0003/igGdXWACZo2CDQ
// I applied a custom color palette and flexible geometry based on width and height properties,
// so the layout is the representation of a pattern scale up or down.
//To improve the interactive aspect I added more four: green circle, red circle, and green parallelogram now resizing based on the mouse movement.
//For this I used more p5.js functions are:
//translate() [https://p5js.org/reference/p5/translate/],
//scale() [https://p5js.org/reference/p5/scale/],
//map() [https://p5js.org/reference/p5/map/],
//and windowResized() [https://p5js.org/reference/p5/windowResized/].
//With these, I was able to translate (move) the origin of the drawing, scale shapes relative to the mouse’s location, and even have the canvas respond to window resizing automatically.