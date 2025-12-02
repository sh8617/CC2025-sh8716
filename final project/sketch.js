let cam;                   // Camera object (p5 video capture)
let step = 12;             // Square brick edge length (pixels)
let doMirror = true;       // Do want to do a horizontal mirror or not
let jitterOn = true;       // Do want to turn on 'Breath' (slight scaling over time) or not
let showVignette = true;   // Do want to overlay dark corners or not
let t = 0;                 // Time variable, sinusoidal breathing
let sx;                    // Mirrored grid x

// Color channel rearrangement mode
let playMode = 0;    // Cycle of 0, 1, and 2 modes

let shapeMode = 0;         // Control the styling of pixel blocks to enhance visual effects
// Mouse trajectory related
let trail = [];            // Save the points moved by the mouse
let maxTrail = 150;        // How many points can be retained at most to control the trajectory length


function setup() {
  createCanvas(640, 480);      // Canvas size
  pixelDensity(1);             // PixelDimension (1) is set to ensure that pixel indices and array lengths correspond one-to-one with canvas width and height, running faster and facilitating pixel level sampling
  // https://p5js.org/reference/p5/pixelDensity/
  cam = createCapture(VIDEO);  // Open default camera
  cam.size(width / step, height / step);
  // Reduce resolution and shrink the camera image to (canvas width/step, canvas height/step)
  // In this way, each pixel of the small image corresponds to a step by step square brick on the canvas
  // https://p5js.org/reference/p5.Element/size/
  cam.hide();                  // Hide the original video elements and only use their pixel data
  // https://p5js.org/reference/p5.Element/hide/
  noStroke();
  rectMode(CORNER);            // Draw a rectangle using the top left corner and width and height
  fill(255);
}

function draw() {
  background(0);

  // Read the pixels of the current frame to the cam.xixels array
  // Cam.xixels is a very long one-dimensional array, where all pixels are arranged together from left to right and top to bottom
  cam.loadPixels();
  //https://p5js.org/reference/p5.Image/loadPixels
  // Learning source: https://www.youtube.com/watch?v=rNqaw8LT2ZU&list=PLRqwX-V7Uu6aKKsDHZdDvN6oCJ2hRY_Ig, Author: The Coding Train
  
  // Canvas Geometric Center (for dark corner calculation)
  let cx = width * 0.5;
  let cy = height * 0.5;

  // Traverse the 'reduced' video pixel grid
  for (let y = 0; y < cam.height; y++) {
    for (let x = 0; x < cam.width; x++) {

      // Extract the RGB of the grid pixels
      let i = (y * cam.width + x) * 4;
      // I calculate the index this way because cam-pixels is a linear array stored by row, with each pixel occupying 4 values (R, G, B, A).
      // So, first use (y * cam. width+x) to determine which pixel this is, and then multiply by 4 to get the position of the R component of that pixel in the array.
      // Afterwards, I will use i+0/i+1/i+2 to read R, G, and B separately.
      // Pixel index calculation, linear index=(y * width+x) * 4
      let r = cam.pixels[i + 0] ;  // Red
      let g = cam.pixels[i + 1] ;  // Green
      let b = cam.pixels[i + 2];  // Blue
      // Because each pixel occupies four consecutive positions (R, G, B, A) in cam-pixels.
      // The i calculated above is the starting position of this pixel, so I use i+0, i+1, and i+2 to extract the values of the red, green, and blue channels respectively.
      // Transparency is not required, so i+3 was not chosen.

      // Calculate canvas coordinates and perform horizontal mirroring based on switches
      if (doMirror) {
        sx = cam.width - 1 - x;  // Flip the screen left and right, and display it like looking in a mirror
      // When x is 0 on the far left, it will become the far right; When x is on the far right, it will become on the far left
      } else {
        sx = x; // Original state
      }
      let px = sx * step; // Square brick, top left corner x
      let py = y  * step; // Upper left corner of square brick y

      
      // I would like to get an approximate value of the 'brightness' here, so that I can decide whether to enlarge or shrink the block later
      // Because each range of r, g, and b is 0-255, I added them up and took the average as the brightness of the current pixel
      let bri = (r + g + b) / 3;

      // Next, I want to convert the brightness of Bri from 0 to 255 into a smaller scaling range
      // I hope the bright areas have slightly larger blocks and the dark areas have smaller ones
      // Map the brightness range of 0-255 to a scaling factor of -0.25 to 0.25. -0.25 to 0.25 is a more suitable value, as this scaling factor is relatively gentle and will not cause the blocks to change too dramatically
      let by = map(bri, 0, 255, -0.25, 0.25);
      let j;
      if (jitterOn) {
        j = 0.15 * sin(t + x * 0.2);       // Sinusoidal fluctuations, controlling time allows all pixels to breathe over time, and x * 0.2 controlling spatial misalignment allows breathing to be like waves rather than jumping together (0.2 makes the waves gentle), resulting in a "soft, natural, and flowing breathing effect" when combined
      } else {
        j = 0;
      }
      // This determines how big each block will ultimately be drawn
      // The basic size is step, and I want it to change along with brightness and "breathing"
      // 'by' is a slight scaling caused by brightness, 'j' is a sine wave fluctuation over time
      // So I added them all to 1 and multiplied them by step to get the final size
      let size = step * (1 + by + j);

      // Dark corner: Calculate the distance ratio from the center of the square brick to the center of the canvas
      // The farther the distance, the smaller the coefficient, and the darker the color after multiplication
      let mx = px + step * 0.5; // Square brick center x (top left corner plus half)
      let my = py + step * 0.5; // Square brick center y
      
      // The larger the'd ', the farther away the block is from the center, and the stronger or weaker the dark corners used later on
      let d = dist(mx, my, cx, cy);  
      // I want to compress this distance d into the range of 0~1, so that it can be used as a coefficient
      // Roughly using 'half width of the canvas' as the maximum distance (otherwise the dark corners will darken prematurely and the shape will be unnatural), the visual effect will be the most natural. Then use constraints to prevent exceeding 0 or 1. If not limited, the color will become particularly bright or black in the end, with 0 representing at the center (no brightness change at all) and 1 representing at the edge of the canvas (the darkest).
      let dNorm = constrain(d / (width * 0.5), 0, 1);  // Reduce the value to a ratio of 0 to 1, where dNorm represents the distance ratio of the current block from the center (0 at the center, 1 at the edge), and convert it to width to achieve a darker angle that is closer to a "perfect circle" as a whole, making it look more natural than height * 0.5 (vertical ellipse)
      let vignetteK;  // Vignette
      if (showVignette) {
        vignetteK = 1 - 0.5 * dNorm;  // Here I subtract 0.5 * dNorm from 1 to make the dark angle: when the center dNorm is 0, it remains 1 (unchanged dark), and the closer it is to the edge dNorm, the closer it is to 1 (the closer it is to the edge, the smaller it is multiplied, more like a dark angle). The coefficient is as low as 0.5, which is equivalent to the edge becoming up to 50% darker at most
      } else {
        // If the dark corner is turned off, there will be no attenuation and the original brightness will be maintained uniformly.
        vignetteK = 1;
      }

      // I want to change the color effect of the square bricks according to different modes, so I pass the r/g/b of the current pixel into my own reorderRGB function, which returns a new [R, G, B] array.
      // After catching the return value here, take the 0th, 1st, and 2nd items respectively and reassign them to r, g, and b,
      // So the fill() below uses the rearranged color instead of the original camera color
      let r_g_b = reorderRGB(r, g, b, playMode, x, y);
      r = r_g_b[0];
      g = r_g_b[1];
      b = r_g_b[2];

      // After adding the dark angle coefficient, fill in the color, and the color near the edge of the canvas will automatically become darker; The range of vignette K is controlled between 0 and 1, so multiplying it will not change the original color tone, but only gradually make the brightness lighter or darker according to distance. In this way, the final drawn square brick will have a dark corner effect
      fill(r * vignetteK, g * vignetteK, b * vignetteK);

         // The geometric center of the current tile (use step instead of size to make the grid more neat)
      let cxTile = px + step * 0.5;
      let cyTile = py + step * 0.5;

      // Perform separate coordinate transformation and rotation for each tile
      push();

      // Move the coordinate system to the center of the current tile, so that all shapes drawn later have the center as the origin
      translate(cxTile, cyTile);

      // Calculate an angle related to time and position, so that each tile rotates independently
      // Using sin for slight oscillation, 0.2 is a relatively gentle arc, and the block size will only breathe slightly within 20% of the range. t is the global time, allowing all blocks to rise and fall together with time (breathing effect). x * 0.3 can cause different columns (x direction) to have a slight time offset, forming horizontal ripples. y * 0.4 is different rows (y direction), also with time offset, forming vertical ripples. Combined, they form a smooth transition "breathing texture like water waves". The values are obtained from multiple tests
      let angle = 0.2 * sin(t + x * 0.3 + y * 0.4);
      rotate(angle); // Rotation
      // https://p5js.org/reference/p5/rotate/

      // Draw different shapes based on the current shape pattern
      if (shapeMode == 0) {
        // Mode 0: Small Square (retains the original rounded square)
        // RectMode is still CORNER, so with (- size/2, - size/2) as the top left corner, so can rotate the block around the center and add a rounded corner radius to make it look like a tile
        rect(-size / 2, -size / 2, size, size, 2);
      } else if (shapeMode == 1) {
        // Mode 1: Small circle, directly centered around the origin
        ellipse(0, 0, size, size);
      } else if (shapeMode == 2) {
        // Mode 2: Small Triangle (roughly within this grid)
        let half = size / 2;
        triangle(
          0, -half,          // A little above
          -half, half,       // lower left
          half, half         // lower right
        );  // https://p5js.org/reference/p5/triangle/
      }

      pop();  // Restore the coordinate system to ensure that each tile does not affect each other
    }
  }
  
    // Mouse trajectory: Record the mouse position and draw a color fading line overlaid on the topmost layer

  // Record trajectory points: Only record when the mouse is pressed and within the canvas range
  if (
    mouseIsPressed &&
    mouseX >= 0 && mouseX <= width &&
    mouseY >= 0 && mouseY <= height
  ) {
    let p = new TrailPoint(mouseX, mouseY, frameCount);

    // Put this' trajectory point object 'into the trail array
    trail.push(p);
    

    // If it's too long, discard the oldest point to ensure the maximum length limit
    if (trail.length > maxTrail) {
      trail.shift(); // Delete the first element of the array
    }
  }

    // Draw a fading colored trajectory based on the trail array
    if (trail.length > 1) {
    strokeWeight(2);
    noFill();

    // Using HSB mode makes it convenient to create rainbow colors
    colorMode(HSB, 360, 100, 100, 255);

    for (let i = 1; i < trail.length; i++) {
      let p1 = trail[i - 1]; // The previous point
      let p2 = trail[i]; // Current point

      // Calculate how long this point has been active (frame rate difference)
      let age = frameCount - p2.frame;

      // The older the age, the lower the transparency, gradually decreasing from 255 to 0
      let alpha = map(age, 0, maxTrail, 255, 0);
      // At most, this tail is allowed to exist on maxTrail for this long, and at this age it should completely disappear
      alpha = constrain(alpha, 0, 255);

      // Colors slowly change hue over time, forming rainbow lines
      let h = (p2.frame * 2) % 360;
      // Multiplying by 2 is to make the hue change faster (the value is the effect of the adjustment), because in colorMode (HSB, 360, 100, 100, 255), the range of Hue is 0-360, so% 360, and as long as the result exceeds 360, it automatically loops back to 0 and starts counting again, making h cycle back and forth between 0 and 359, like a rainbow spinning one circle after another
      stroke(h, 80, 100, alpha);

      // Draw a line segment to connect the previous trajectory point to the current point
      line(p1.x, p1.y, p2.x, p2.y);
    }

    // After drawing the trajectory, return to RGB mode to avoid affecting the subsequent drawing
    colorMode(RGB, 255);
    noStroke();  // Restore to the unpainted state and maintain consistency with the original state
  }
  // Advance time, drive breathing animation
  t += 0.03;
}

// Write trajectory points as a class specifically for storing x/y/frame
class TrailPoint {
  constructor(x, y, frame) {
    // The x-coordinate of the mouse at that time
    this.x = x;
    // The y-coordinate of the mouse at that time
    this.y = y;
    // Record at which frame this appeared, used to calculate 'how long did live' and fade in effect
    this.frame = frame;
  }
}
// Define the function reorderRGB to rearrange the order of r/g/b according to different modes, so that different color effects can be achieved by simply changing the channel order
function reorderRGB(r, g, b, mode, x, y) {
  // Mode 0: No processing, use the original order directly
  if (mode == 0) {
    return [r, g, b];
  }
  // Mode 1: Create a simple "checkerboard" effect
  // I use (x+y)% 2 to determine whether the current block is an "even grid" or an "odd grid"
  // Using different channels to exchange different grids makes the picture look more rhythmic
  if (mode == 1) {
    if ((x + y) % 2 == 0) {
      // Even grid: Swap R and B
      return [b, g, r];
    } else {
      // Odd Grid: Swap G and B
      return [r, b, g];
    }
  }
  // 模Mode 2: Divide into three categories based on which color channel is the largest
  // By comparing the size of r/g/b
  if (mode == 2) {
    // Use the simplest logic to roughly separate colors based on 'which channel is the largest'
    if (r >= g && r >= b) {
      // Most red components: considered as "red series"
      // Then change the order and make the overall color feel a bit biased towards another feeling
      return [r, b, g]; 
    } else if (b >= r && b >= g) {
      // Put the original b into the red channel, then reassign r and g to shift the color to another color gamut
      return [b, r, g];
    } else {
      // Using a simple rotation of (r, g, b) to (g, b, r), create a third color cast effect.
      return [g, b, r];
    }
  }
  // If the mode number exceeds the range I set, return it as it is to prevent errors
  return [r, g, b];
}


// Keyboard interaction
// Adjust the size of the square brick with the up and down arrow keys (while synchronizing the resolution)
// M switch image; R switch breathing; V switch to dark corners; C Switch color rearrangement mode；S Switch Shape Mode
function keyPressed() {
  if (keyCode == UP_ARROW) {
    // After trying several sets of values here, I found that the range of 4-40 changes more naturally, so I set it this way for now
    step = min(step + 2, 40);  // Limit the numerical value to prevent it from being too large
    // https://p5js.org/reference/p5/min/
    cam.size(width / step, height / step); // Synchronize with step to update resolution
  } else if (keyCode == DOWN_ARROW) {
    step = max(step - 2, 4);  // Limit the numerical value to prevent it from being too small
    // https://p5js.org/reference/p5/max/
    cam.size(width / step, height / step);
  } else if (key == 'm' || key == 'M') {
    doMirror = !doMirror;          // Switch mirror
  } else if (key == 'r' || key == 'R') {
    jitterOn = !jitterOn;          // Switch breathing
  } else if (key == 'v' || key == 'V') {
    showVignette = !showVignette;  // Switch dark corner
  } else if (key == 'c' || key == 'C') {
    playMode = (playMode + 1) % 3;  // By switching to the next mode with+1,% 3 can make the result loop between 0, 1, and 2 modes forever
  } else if (key == 's' || key == 'S') {
    // Press S to switch shape mode
    shapeMode = (shapeMode + 1) % 3;
  }
}
