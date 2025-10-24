// Sketch A: Breathing Ring of Dots
let ringDotsCountA = 24; // There are a total of 24 points on the circle (if change this number, so can immediately see the density change)
let ringTimeA = 0;       // Using a variable that increases over time to drive 'breathing' and 'rotation'

function setup(){
  createCanvas(400, 400);
  noStroke();
}

function draw(){
  background(20);

  // I want the whole circle of dots to fluctuate like breathing.
  // At first, I added and subtracted constants directly on the radius, which had a too hard effect; Later, it was changed to using sin (time), and the radius would smoothly change back and forth.
  // RingBaseRadiusA is the 'stationary' radius; RingPulseA is the fluctuation of "breathing".
  let ringBaseRadiusA = 120;
  let ringPulseA = 20 * sin(ringTimeA);   // When sin swings at [-1,1], 20 * it swings at [-20,20]
  let ringRadiusA = ringBaseRadiusA + ringPulseA;

  // Move the coordinate origin to the center of the canvas for easy drawing of a full circle using polar coordinates
  translate(width/2, height/2);

  // The for loop divides the entire circle of 0 to TWO-PI evenly into 24 points and rotates slightly over time
  for (let ringNumberA = 0; ringNumberA < ringDotsCountA; ringNumberA++){
    // angleA：
    // TWO-PI * (Point/Total): Divide the entire circle evenly
    // + RingTimeA * 0.6: Let the entire circle rotate slowly (0.6 is the speed I have tried to find more comfortable)
    let angleA = TWO_PI * ringNumberA / ringDotsCountA + ringTimeA * 0.6;

    // Convert the angle and radius to the x and y coordinates on the screen using cos and sin
    let dotPosXA = cos(angleA) * ringRadiusA;
    let dotPosYA = sin(angleA) * ringRadiusA;

    // I hope the color is not purely fixed, give it a little variation with the serial number and time.
    // Here I use two methods:
    // Red: Slightly undulate with angle and time (sin). If no time is added, the color will remain fixed (only gradually changing with angle, but not flowing).
    // Green: Flowing over time, becoming dynamic colored ripples
    let redA   = map(sin(angleA + ringTimeA), -1, 1, 120, 255);
    let greenA = map(sin(angleA + ringTimeA), -1, 1, 80, 200);
    let blueA  = 220;
    fill(redA, greenA, blueA);

    // Make a slight 'breath' of the size of the dots, otherwise the whole circle will look too 'rigid'.
    // Here, I add a small offset (* 0.2) for each point in time to ensure that the size changes are not completely synchronized.
    let dotSizeA = map(sin(ringTimeA + ringNumberA*0.2), -1, 1, 6, 14);

    // Draw this point
    ellipse(dotPosXA, dotPosYA, dotSizeA, dotSizeA);
  }

  // Add a little more time: the animation will move on its own without the need for a mouse or keyboard
  ringTimeA = ringTimeA + 0.02; // This value determines the speed. I have tried that 0.01 is too slow, 0.05 is too urgent, and 0.02 is more natural
}
