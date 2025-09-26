let cell = 100; 
// each eye’s “cell size” (spacing between eyes)
let cols, rows; 
// how many columns and rows of eyes

function setup() {
  createCanvas(windowWidth, windowHeight); 
  cols = floor(width / cell);
  // reference link：https://p5js.org/reference/p5/floor/
  // use floor to make sure column count is an integer (drop decimals)
  // number of columns (width ÷ cell size)
  rows = floor(height / cell);
  // number of rows (height ÷ cell size)
  // use floor so rows are whole numbers, no fractions
  ellipseMode(CENTER);
  // draw circles from their center
}

function drawGradient(c1, c2) {    
  // reference link：https://p5js.org/reference/p5/function/          
  // custom function to draw gradient background
  // c1 and c2 are two color inputs (color1, color2)
  for (let y = 0; y < height; y++) { 
    // loop from the top of the screen (y=0) down to the bottom (y=height)
    let inter = map(y, 0, height, 0, 1);  
    // inter is a ratio (0 → 1)
    // map(y, 0, height, 0, 1) turns y from range [0, height] into [0, 1]
    // example: if y is in the middle (height/2), inter = 0.5
    let c = lerpColor(c1, c2, inter);
    // blend color c1 → c2 using that ratio
    // lerpColor blends two colors together
    // c1 = start color, c2 = end color, inter = how much to mix
    // inter=0 → all c1, inter=1 → all c2, inter=0.5 → halfway blend
    stroke(c);
    // stroke sets the pen color to that blended color
    line(0, y, width, y);
    // draw a horizontal line at this y position
    // from left side (x=0) to right side (x=width)
  }
}

function draw() {
  drawGradient(color('#FCA5F1'), color('#B5FFFF'));
  // background goes from pink to blue
  
  for (let j = 0; j < rows; j++) {
    // Outer loop: go over every row.
    // j starts at 0, then 1, 2… until j is one less than rows.
    for (let i = 0; i < cols; i++) {
      // Inner loop: go over every column inside this row.
      // i starts at 0 and walks across the grid.
      push();
      // save the current drawing state (position, styles, etc.)
      translate(i * cell + cell/2, j * cell + cell/2);
      // Move the “origin” (0,0) to the "center of this grid cell".
      // i * cell and j * cell jump to the cell’s top-left.
      // + cell/2 shifts to the middle so circles are centered.

      // progress value t, changes with row
      let t = map(j, 0, rows-1, 0, 1);
      // Turn the row number into a 0→1 value:
      // top row (j=0) gives 0, bottom row (j=rows-1) gives 1.
      // Using rows-1 ensures the bottom row reaches 1 exactly.


      // eye size grows bigger in lower rows
      let eyeSize = lerp(60, 120, t);
      // reference link：https://p5js.org/reference/p5/lerp/
      // Pick a size between 60 and 120 based on t.
      // lerp means "linear interpolation"
      // it picks a value between 60 and 120
      // t is a number between 0 and 1
      // if t = 0 → result = 60
      // if t = 1 → result = 120
      // if t = 0.5 → result = 90 (halfway between 60 and 120)
      // so t works like a slider that blends between 60 and 120
      let pupilSize = eyeSize * 0.5;
      // Make the pupil half the eye’s size (nice and proportional).

      // pupil follows the mouse
      // left-right
      let offsetX = map(mouseX, 0, width, -eyeSize/6, eyeSize/6);
      // Horizontal pupil drift. When the mouse is at the left edge,
      // offset is -eyeSize/6; at the right edge it’s +eyeSize/6.
      // So the pupil “looks” left and right with the mouse.
      
      // up-down
      let offsetY = map(mouseY, 0, height, -eyeSize/6, eyeSize/6);
      // Vertical pupil drift. Same idea but up/down using mouseY.

      // stop pupil from moving too far out
      offsetX = constrain(offsetX, -eyeSize/4, eyeSize/4);
      // reference link：https://p5js.org/reference/p5/constrain/
      // Safety: clamp the X offset so the pupil can’t slide too far.
      // It stays within [-eyeSize/4, +eyeSize/4].
      offsetY = constrain(offsetY, -eyeSize/8, eyeSize/8);
      // Safety for Y as well. Vertical range is a bit tighter so
      // the pupil won’t “fall” out of the lower eyelid.

      // draw eyeball background (light pink)
      fill("rgb(249,200,248)");
      // eye color changes with row and mouse
      let r = map(j, 0, rows-1, 249, 180);// red changes with row
      let g = map(mouseX, 0, width, 200, 255);// green changes with mouseX
      let b = map(mouseY, 0, height, 248, 180);// blue changes with mouseY
      // if mouse is pressed, use dynamic colors
      if (mouseIsPressed) {
        fill(r, g, b);
        stroke(r, g, b);
      } else {
        fill(249, 200, 248);// otherwise stay pink
        stroke(249, 200, 248);
      }
      stroke("rgb(249,200,248)");
      ellipse(0, 0, eyeSize, eyeSize);
      

      // pupil color
      let pr = map(i, 0, cols-1, 50, 200);
      // red changes with column
      let pg = map(j, 0, rows-1, 50, 200);
      // green changes with row
      let pb = map(mouseX, 0, width, 50, 255);
      // blue changes with mouseX

      // pupil is black unless mouse pressed
      if (mouseIsPressed) {
        fill(pr, pg, pb);
        // if the mouse is clicked, fill the pupil with colors
        // pr, pg, pb are numbers for red, green, blue color channels
        // they change depending on row, column, or mouse position
      } else {
        fill(0);
      }
      noStroke();
      ellipse(offsetX, offsetY, pupilSize, pupilSize);
      // draw the pupil (a circle)
      // offsetX → how far left/right the pupil is, following the mouse
      // offsetY → how far up/down the pupil is, following the mouse
      // pupilSize → width of the circle
      // pupilSize again → height of the circle (same, so it's a perfect circle)

      // function to draw a diamond shape
      // x, y → the center point of the diamond
      // w → how wide the diamond is
      // h → how tall the diamond is
      function detail(x, y, w, h) {
        beginShape();
        vertex(x, y - h/2);
        // top point
        // take the center y and move UP by half the height
        // h/2 makes sure the top is exactly half the height above center
        vertex(x + w/6, y);
        // right point
        // take the center x and move RIGHT by 1/6 of the width
        // "w/6" keeps the diamond skinny, not stretched too wide
        // y stays the same, so it’s horizontally aligned
        vertex(x, y + h/2);
        // bottom point
        // take the center y and move DOWN by half the height
        // matches the "top point" but in the opposite direction
        vertex(x - w/6, y);
        // left point
        // take the center x and move LEFT by 1/6 of the width
        // again, y stays the same so it’s horizontal
        endShape(CLOSE);
      }

      // if mouse pressed, draw a colored diamond in the pupil
      if (mouseIsPressed) {
        let r = map(mouseX, 0, width, 100, 255);
        // pick a red value from mouseX (100 → 255)
        let g = map(mouseY, 0, height, 100, 255);
        // pick a green value from mouseY (100 → 255)
        let b = map(mouseX + mouseY, 0, width + height, 150, 255);
        // pick a blue value from mouseX+mouseY (150 → 255)

        // set fill color using r,g,b values
        fill(r, g, b);
        noStroke();
        detail(offsetX, offsetY, pupilSize * 0.4, pupilSize * 1); 
        // center X — same as the pupil center, follows the mouse
        // center Y — same as the pupil center
        // width  — 40% of the pupil size (keeps it skinny)
        // height — same as the pupil size (tall diamond)
        // draw the diamond at the pupil position
      }

      // cover top half of the eye with white arc (upper eyelid)
      fill(255); 
      stroke("#FFFFFF");
      strokeWeight(1.5);
      arc(0, 0, eyeSize, eyeSize, PI, TWO_PI, CHORD);
      // arc(x, y, w, h, startAngle, stopAngle, mode)
      // angles are in radians: 0 is at 3 o’clock, PI is 9 o’clock, TWO_PI is 3 o’clock again
      // from PI → TWO_PI draws the top half of the circle (moving across the top)
      // CHORD closes the arc with a straight line between the ends

      // draw eyelids (dark arcs), controlled by mouseY
      noFill();
      stroke("rgb(96,44,95)");
      strokeWeight(3);
      let eyelid = map(mouseY, 0, height, 0, PI/2);
      // mouseY decides open/close
      // Map mouseY to an angle amount. At the top of the screen: eyelid ≈ 0 (wide open).
      // At the bottom: eyelid ≈ PI/2 (more closed).
      arc(0, 0, eyeSize, eyeSize, PI+eyelid, TWO_PI-eyelid);
      // top lid
      // Start a little to the right of 9 o’clock (PI + eyelid),
      // end a little to the left of 3 o’clock (TWO_PI - eyelid).
      // As eyelid grows, both ends move toward the center, making the opening smaller.
      arc(0, 0, eyeSize, eyeSize, 0+eyelid, PI-eyelid); 
      // bottom lid
      // Start a little to the right of 3 o’clock (0 + eyelid),
      // end a little to the left of 9 o’clock (PI - eyelid).
      // Same idea: larger eyelid angle = arcs close in.

      pop(); 
      // restore drawing state
    }
  }
}