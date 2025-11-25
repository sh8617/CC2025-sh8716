let cam;       // Camera object (p5 video capture)
let step = 12; // Square brick edge length (pixels)

function setup() {
  createCanvas(640, 480);     // Canvas size
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
}

function draw() {
  background(0);
  // Read the pixels of the current frame to the cam.xixels array
  // Cam.xixels is a very long one-dimensional array, where all pixels are arranged together from left to right and top to bottom
  cam.loadPixels();
  //https://p5js.org/reference/p5.Image/loadPixels
  // Learning source: https://www.youtube.com/watch?v=rNqaw8LT2ZU&list=PLRqwX-V7Uu6aKKsDHZdDvN6oCJ2hRY_Ig, Author: The Coding Train

  // Traverse the 'reduced' video pixel grid
  for (let y = 0; y < cam.height; y++) {
for (let x = 0; x < cam.width; x++) {
  // Extract the RGB of the grid pixels
      let i = (y * cam.width + x) * 4;
      
  // I calculate the index this way because cam-pixels is a linear array stored by row, with each pixel occupying 4 values (R, G, B, A).
      // So, first use (y * cam. width+x) to determine which pixel this is, and then multiply by 4 to get the position of the R component of that pixel in the array.
      // Afterwards, I will use i+0/i+1/i+2 to read R, G, and B separately.
      // Pixel index calculation, linear index=(y * width+x) * 4
      let r = cam.pixels[i + 0];  // Red
      let g = cam.pixels[i + 1];  // Green
      let b = cam.pixels[i + 2];  // Blue
      // Because each pixel occupies four consecutive positions (R, G, B, A) in cam-pixels.
      // The i calculated above is the starting position of this pixel, so I use i+0, i+1, and i+2 to extract the values of the red, green, and blue channels respectively.
      // Transparency is not required, so i+3 was not chosen.

      let px = x * step; // Square brick, top left corner x
      let py = y * step; // Upper left corner of square brick y

      fill(r, g, b);
      rect(px, py, step, step);
    }
  }
}