// Assignment 2: Generative Pattern

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  // this for loop increments y from 0 to the height of the canvas
  // it draws a line every 5 pixels, and changes the hue of the stroke color
  // to create a gradient effect
  // Gradient colors: # FCA5F1, # B5FFFF
  // #FCA5F1 is (252,165,241), #B5FFFF is (181,255,255)
  // This is based on the method taught by the teacher
  for (let y = 0; y<height; y+=5) {
    let r = map(y, 0, height, 252, 181);
    let g = map(y, 0, height, 165, 255);
    let b = map(y, 0, height, 241, 255);
    stroke(r, g, b);
    strokeWeight(5);
    line(0, y, width, y);
  }
  //noLoop(); // prevents draw from looping
  // Eye grid, place one eye every 100px, leaving 50px margins around each side
  for (let y = 50; y < height - 50; y += 100) {
    for (let x = 50; x < width - 50; x += 100) {
      push();
      // everything within this push/pop block
      // will be centered, with 0,0 as the center
      //point
      translate(x, y); // The center of each eye

      // The size of the eyes changes with the number of movements (the lower the movement, the larger the movement)
      let eyeSize = map(y, 50, height - 50, 60, 120);
      let pupilSize = eyeSize * 0.5;

      // Pupil follows the mouse (left, right, up and down), with a white radius of eyeSize/2 and a pupil radius of eyeSize/4
      // Map() maps the mouse position to a small displacement. The displacement should not be too large, otherwise it will "turn white".
      // First, provide a target displacement range, and then use constrict() for secondary protection.
      let offsetX = map(mouseX, 0, width, -eyeSize / 6, eyeSize / 6);
      let offsetY = map(mouseY, 0, height, -eyeSize / 6, eyeSize / 6);
      // Prevent the pupils from running out of the white range of the eyes
      // /6 as the target range, the response is more obvious; /8 as a limit, ensure that it will not exceed the limit.
      // The choices of/6 and/8 are my tactile values after multiple tests
      // Use the constraint function to restrict the movement of offsetX（https://p5js.org/reference/p5/constrain/）
      offsetX = constrain(offsetX, -eyeSize / 8, eyeSize / 8);
      
      
      
      // White eyes (light powder)
      stroke(249, 200, 248);
      fill(249, 200, 248);
      ellipse(0, 0, eyeSize, eyeSize);

      // The default pupil color is black, and it changes color when pressed with the mouse (depending on position), so that each eye is slightly different when pressed.
      let pr = map(x, 50, width - 50, 50, 200);
      let pg = map(y, 50, height - 50, 50, 200);
      let pb = map(mouseX, 0, width, 50, 255);
      if (mouseIsPressed) {
        fill(pr, pg, pb);
      } else {
        fill(0);
      }
      noStroke();
      ellipse(offsetX, offsetY, pupilSize, pupilSize);

      // Press the mouse and draw a colored diamond in the pupil
      // I want to make the details more 'toy like'
      if (mouseIsPressed) {
        // Color follows mouse position
        let cr = map(mouseX, 0, width, 100, 255);
        let cg = map(mouseY, 0, height, 100, 255);
        let cb = map(mouseX + mouseY, 0, width + height, 150, 255);
        fill(cr, cg, cb);
        noStroke();
        // Draw a diamond directly
        beginShape();
        vertex(offsetX, offsetY - pupilSize / 2);          // top
        vertex(offsetX + pupilSize * 0.1 , offsetY);        // right
        // In order to make the diamond appear thinner, it occupies about 20% of the size of the pupil, while the left and right sides each occupy 10%
        vertex(offsetX, offsetY + pupilSize / 2);          // bottom
        vertex(offsetX - pupilSize * 0.1, offsetY);        // left
        endShape(CLOSE);
      }

      // Cover the upper eyelid to make it look more like a blink
      fill(255);
      stroke(255);
      strokeWeight(1.5);
      arc(0, 0, eyeSize, eyeSize, PI, TWO_PI, CHORD);

      // Eyelid line, slightly closed with mouseY
      noFill();
      stroke(96, 44, 95);
      strokeWeight(3);
      let eyelid = map(mouseY, 0, height, 0, PI / 2);
      // Upper eyelid line
      arc(0, 0, eyeSize, eyeSize, PI + eyelid, TWO_PI - eyelid);
      // Lower eyelid line
      arc(0, 0, eyeSize, eyeSize, 0 + eyelid, PI - eyelid);

      pop();
    }
  }
}

