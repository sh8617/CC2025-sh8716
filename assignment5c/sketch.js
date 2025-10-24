// Sketch C: Rotating Cross with Lerp Background
// Create a background that will 'breathe and change color' with a slowly rotating cross at the center, surrounded by small dots that rise and fall in sync.


let blendTimeC = 0; // Time variable, add a little bit per frame to drive animation

function setup(){
  createCanvas(400, 400);
  rectMode(CENTER); // Let the rectangle be centered for better control of rotation
}

function draw(){
  // The background color transitions back and forth between two colors (using lerp+sin)
  // Starting color (pink): (255, 120, 160) Ending color (blue): (120, 180, 255)
  // First, change the range of sin from -1.1 to 0.1 (so that it can be considered as a mixing ratio)
  let tC = sin(blendTimeC) + 1;

  let rC = lerp(255, 120, tC);
  let gC = lerp(120, 180, tC);
  let bC = lerp(160, 255, tC);
  background(rC, gC, bC);

  // The central 'cross' rotates over time
  translate(width/2, height/2);
  rotate(blendTimeC * 0.6); // The angle is advanced by time, and the rotation speed is controlled numerically
  // reference link: https://p5js.org/reference/p5/rotate/

  // Vertical bar (light color)
  noStroke();
  fill(255, 240, 220);
  rect(0, 0, 40, 220);

  // Horizontal bar (dark, slightly transparent)
  fill(30, 30, 30, 200);
  rect(0, 0, 220, 40);

  // A small circle around the periphery: consistent with the theme of "circling" in sketch A
  let ringCountC = 16;  // Number of points
  let ringRC = 140;     // Circular radius

  for (let ringNumberC = 0; ringNumberC < ringCountC; ringNumberC++){
    // Divide the angle of each point equally into a circle, and add a time-dependent offset to make the entire circle slowly rotate in the opposite direction
    let angleC = TWO_PI * ringNumberC / ringCountC - blendTimeC * 0.8;

    // Convert polar coordinates to Cartesian coordinates
    let dotXC = cos(angleC) * ringRC;
    let dotYC = sin(angleC) * ringRC;

    // The size of the dots also fluctuates slightly over time to avoid being too rigid
    let sizeC = map(sin(blendTimeC + ringNumberC * 0.3), -1, 1, 4, 10);
// RingNumberC * 0.3 can make the animation of each point slightly staggered, without fluctuating together.
// In this way, the small dots in the same circle will not become larger and smaller at the same time, but will "pass along" like waves, creating a more "flowing" sensation.
    fill(255);
    ellipse(dotXC, dotYC, sizeC, sizeC);
  }

  // Time: At the beginning, I added too quickly (such as 0.05), and the screen turned quickly; Reduced to 0.02 is more comfortable
  blendTimeC = blendTimeC + 0.02;
}