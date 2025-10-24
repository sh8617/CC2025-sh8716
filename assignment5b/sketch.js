// Sketch B: Noise Wavy Beads
// This sketch aims to create a feeling of "bead chains gently undulating in the water".
// I use a fixed grid and noise for left and right offset, and color and size gradient with numerical values.
// By increasing the time variable itself, the screen can automatically move without manual interaction.

let noiseTimeB = 0; // As a variable of 'time', add a little bit per frame to drive the change of noise

function setup(){
  createCanvas(400, 400);
  noStroke(); // Beads should only be filled, not stroke
}

function draw(){
  background(10);

  // Grid spacing (40 pixels in both horizontal and vertical directions)
  let rowStepB = 40;
  let colStepB = 40;

  // Here, use positional variables to directly navigate the grid: starting from 0, add a fixed step size each time.
  // This allows for intuitive control of the position of beads in each row and column.
  for (let rowYB = 0; rowYB <= height; rowYB += rowStepB){
    for (let colXB = 0; colXB <= width; colXB += colStepB){
      // I hope each point has a slight left and right sway, but not too random shaking,
      // So I used noise(). Give noise the time and location together.
      // In this way, adjacent points will move relatively smoothly instead of shaking.
      let noiseValueB = noise(noiseTimeB + rowYB * 0.01 + colXB * 0.01);
      // I hope that the offset of each bead is different, but they are connected to each other (like a whole water wave).
      // RowYB (which line) is responsible for making the adjacent beads on top and bottom offset similarly;
      // ColXB (column number) is responsible for making the adjacent beads on the left and right offset similarly;
      // NoiseTimeB is responsible for overall "flow" over time.

      // Map the 0.. 1 of noise to a left and right offset range (-18.. 18)
      // This range has been adjusted repeatedly by me. Even if the offset is too large, the screen will be messy, and if it is too small, it cannot be seen moving.
      let offsetXB = map(noiseValueB, 0, 1, -18, 18);

      // The final position of the beads is on the basis of a regular grid, with a lateral offset added
      let beadPosXB = colXB + offsetXB;
      let beadPosYB = rowYB;

      // The color has a simple gradient: rows affect red, columns affect green, and blue is related to noise.
      // This can avoid the whole screen being in the same color and make it look more layered.
      let redB   = map(rowYB, 0, height, 60, 200);
      let greenB = map(colXB, 0, width, 120, 255);
      let blueB  = map(noiseValueB, 0, 1, 180, 255);
      fill(redB, greenB, blueB);

      // The size of the beads is also linked to the noise level, with slight variations to make the image less rigid.
      let beadSizeB = map(noiseValueB, 0, 1, 6, 14);
      ellipse(beadPosXB, beadPosYB, beadSizeB, beadSizeB);
    }
  }

  // Here use the most basic increment: add 0.01 to the time per frame.
  // I added it too quickly at first, and the noise changes appeared very noisy; After reducing the step size, the movement becomes smoother.
  noiseTimeB = noiseTimeB + 0.01;
}
