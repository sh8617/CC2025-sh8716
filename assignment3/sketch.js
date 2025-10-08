//Assignment 3: Abstract Clock
// Week 5: Transformations And Time
//Title: “Blooming Vase Clock” Concept. My inspiration comes from a Chinese saying: “The Ephemeral Bloom” (昙花一现). For those who don’t know, it refers to a fleeting, stunning moment of beauty for a flower.
//And my mom always enjoys placing flowers on the windowsill daily. 
//She says flowers make people happy but they fade too fast. So she also buys new flowers every day and Re insert the flowers into the vase.
//I was trying to capture that, how beauty and time both move so fast, in a vase of flowers opening and closing under the sunlight.
//For convenience of observing the effect, I synchronize one real-world day with one minute.
//The sun rises from the horizon, crosses the sky, and sets in one minute.
//Flowers bloom in the sunlight and close again as night falls.
//It’ s a way of poetically expressing the passage of time through the seasons. 

let startTime;             // Used to record the start time of each 'day'
let dayLength = 60000;     // Set "1 minute" as the length of "day" (in milliseconds)


function setup() {
  createCanvas(500, 700);  // Create a vertical canvas of 500x700, similar to a window scale
  startTime = millis();    // Record the current time as the starting point for 'morning'
}

function draw() {
  // Time schedule calculation (t: 0 to 1)
  // Millis() is a system timer that returns the number of milliseconds that have passed since the program was started
  let elapsed = millis() - startTime;  // Calculate how long has passed since "morning"
  let t = elapsed / dayLength;         // Convert time into percentages (0 equals morning, 1 equals night)

  // If after one minute (is one day), reset to a new day
  // This way, the screen will cyclically change
  if (t > 1) {
    startTime = millis();  // Reset timer
    t = 0;                 // start anew
  }

  // Background drawing (upper part sky, lower part indoor wall)
  noStroke();                      
  // No need for border lines
  
  // Dynamic sky color changes with time of day
  // Simulate the cycle from night to morning to noon to evening to night
  let skyR, skyG, skyB;

  if (t <= 0.25) {
    // Night to dawn: dark blue to light blue
    // The specific RGB value comes from the reference in Adobe Illustrator
    skyR = map(t, 0.0, 0.25, 20, 150);
    skyG = map(t, 0.0, 0.25, 30, 180);
    skyB = map(t, 0.0, 0.25, 60, 210);
  } 
  else if (t <= 0.5) {
    // Morning to noon: light blue to bright sky
    skyR = map(t, 0.25, 0.5, 150, 205);
    skyG = map(t, 0.25, 0.5, 180, 210);
    skyB = map(t, 0.25, 0.5, 210, 190);
  } 
  else if (t <= 0.75) {
    // Noon to evening: bright sky to warm sunset
    skyR = map(t, 0.5, 0.75, 205, 150);
    skyG = map(t, 0.5, 0.75, 210, 120);
    skyB = map(t, 0.5, 0.75, 190, 100);
  } 
  else {
    // Evening to night: orange sunset to dark blue
    skyR = map(t, 0.75, 1.0, 150, 20);
    skyG = map(t, 0.75, 1.0, 120, 30);
    skyB = map(t, 0.75, 1.0, 100, 60);
  }
  fill(skyR, skyG, skyB);             // Sky: The sky changes color over time
  rect(0, 0, width, height / 2);   // Sky rectangle area: upper half of canvas
  fill(120, 110, 90);              // Wall: Deep brownish gray, creating a warm indoor atmosphere
  rect(0, height / 2, width, height / 2);

  // Window frame: Separating the sky from the wall, making the picture more lifelike
  stroke(70, 40, 0);     // Dark brown, imitating wooden window frames
  strokeWeight(10);      // Slightly coarse, appearing stable
  line(0, height / 2, width, height / 2);

  // Sun: Moving along a semi-circular arc
  // The movement of the sun is represented by a semi-circular trajectory to show the passage of time (0 to 180°: from left to right)
  // Number selection:
  let cx = width / 2;     // The center of the circle is in the middle of the canvas (visual balance)
  let cy = height / 2;    // The center of the circle is on the window frame line (where the sun "rises")
  let radius = 250;       // Set the radius to 250, covering exactly the upper half of the sky
  let angle = map(t, 0, 1, 0, PI); // T equals 0 corresponds to angle 0 (left), t equals 1 corresponds to PI (right)

  // Calculate the current coordinates of the sun, as in the mathematical coordinate system, cos (θ) controls the x coordinate and sin (θ) controls the y coordinate.
  //When the angleθequals 0 °: cos (0) equals 1, the point is on the far right.
  //When the angle θ equals 90 °: cos (90) equals 0, sin (90) equals 1, the point is at the top.
  //When the angle θ equals 180 °: cos (180) equals -1, the point is on the far left.
//After adding a negative sign, it just rises from left to right.
  // -Sin/cos calculation makes the sun move in an arc up and down, appearing natural
  // -Cx, cy represent the center of a semicircle
  let sunX = cx - cos(angle) * radius;  // Lateral movement (cos control left and right)
//*radius can be from the left point for sunrise, sunset to the right point
  let sunY = cy - sin(angle) * 180;     // Longitudinal curvature (sin controls up and down)
//Because I don't want the sun to move too high, so * 180


  noStroke();
  fill(255, 220, 80);     // Bright yellow represents daylight and the sun
  ellipse(sunX, sunY, 80, 80); // The size of the sun is fixed at 80px (visually centered)

  // When the sun approaches the horizon (t<0.1 or t>0.9), it is partially blocked by the window sill
  // Express the moments of "sunrise just appears" and" sunset sinking"
  if (t < 0.1 || t > 0.9) {
    fill(120, 110, 90);   // Redraw the occlusion effect with wall colors
    rect(0, height / 2, width, height / 2);
    stroke(70, 40, 0);     // Brown, imitating wooden window frames
    strokeWeight(10);      // Slightly coarse, appearing stable
    line(0, height / 2, width, height / 2);
  }

  

  // Bottom position of the vase (as the starting point of the stem line)
  let vaseX = width / 2;      // Horizontal center (echoing the sun)
  let vaseY = height - 100;   // Close to the bottom, leaving a vase height

  
  
  // Stem color fades to brown after noon
  // Before noon (t less than and equals 0.5): fresh green
  // After noon (t more than 0.5): gradually turns to brownish color
  let stemR, stemG, stemB;

  if (t <= 0.5) {
    // Morning: fresh green stem
    stemR = 100;
    stemG = 130;
    stemB = 80;
  } else {
    // Afternoon to evening: blend from green to brown
    // Map(t, 0.5 to 1.0) means color shifts from green (100,130,80) to brown (120,100,60)
    stemR = map(t, 0.5, 1.0, 100, 120);
    stemG = map(t, 0.5, 1.0, 130, 100);
    stemB = map(t, 0.5, 1.0, 80, 60);
  }
  
  // Flower stem (representing support and extension of time)
  stroke(stemR, stemG, stemB); // Light green tone, imitating plant stems
  strokeWeight(3);
  noFill();
  // Multiple roots and stems, forming a sense of rhythm and staggered layers.
  line(vaseX, vaseY, vaseX - 90, 200);
  line(vaseX, vaseY, vaseX - 50, 310);
  line(vaseX, vaseY, vaseX - 20, 230);
  line(vaseX, vaseY, vaseX, 350);
  line(vaseX, vaseY, vaseX + 40, 290);
  line(vaseX, vaseY, vaseX + 90, 260);
  line(vaseX, vaseY, vaseX - 70, 420);
  line(vaseX, vaseY, vaseX + 29, 425);
  line(vaseX, vaseY, vaseX + 70, 380);
//These values have been obtained through multiple attempts and may continue to be adjusted later.


// Flower opening and closing degree (bloom)
  // The flowers bloom during the day and close at night. So still use map() to control the size based on the time ratio
  // 0.4 is the minimum opening at night, 1.0 is fully bloomed during the day
  let bloom;

  // If the angle of the sun is less than 90 degrees (from morning to noon), the flowers gradually bloom
  if (angle < HALF_PI) {
  bloom = map(t, 0, 0.5, 0.4, 1.0); 
  }
  // If the angle of the sun exceeds 90 degrees (after noon), the flowers gradually decline and close
  else {
  bloom = map(t, 0.5, 1.0, 1.0, 0.3); 
  }
  // Flowers (each flower represents a moment of time)
  // The number of petals is fixed (12 pieces), and they expand and contract as the bloom value changes over time
  // Each flower is in a different position, forming a "rhythm of time"
  
  // Color fading control
  // Before noon (t less than or equals 0.5), colors are bright; after noon (t > 0.5), fade toward gray.
  let fade = 1.0;  // color intensity multiplier (1: full   color)
  if (t > 0.5) {
  fade = map(t, 0.5, 1.0, 1.0, 0.5);  // gradually fade to 50% brightness
  }

  // Petal color adjusts based on fade
  //"245, 240, 220" Petals: off white, symbolizing softness and purity
  let petalR = 245 * fade;
  let petalG = 240 * fade;
  let petalB = 220 * fade;

  noStroke();
  fill(petalR, petalG, petalB); // faded petals

  // Flower center colors also fade with sunlight
  // These RGB values come from the original flower center colors
  // (180,150,60) and (255,230,120): both will darken as fade decreases
  let centerR = 180 * fade;
  let centerG = 150 * fade;
  let centerB = 60 * fade;

  let innerR = 255 * fade;
  let innerG = 230 * fade;
  let innerB = 120 * fade;
  
  
  
  //In order to achieve the temporal variation of several flowers in different positions, the pop() push() function is used to avoid affecting other flowers
  //Flower 1 (top left)
  push();                // Save current state (coordinates and rotation)
  translate(vaseX - 90, 200); // Move the flower position to the corresponding stem position, making them appear connected
  for (let i = 0; i < 12; i++) {
  ellipse(0, -(60 * bloom) / 2.5, (60 * bloom) / 4, (60 *   bloom)); // Single petal
  //ellipse(x, y, w, h)， 60 as the unit of length for petal formation (specific value obtained through multiple attempts), * bloom to achieve dynamic length
  //Let the petals grow upwards, so it is a negative sign, approximately equal to 1/2.5 of the radius
  //Petals should grow out from the center of the flower and not completely cover the center; /2.5 Let it "extend a little bit", adjusting it too small will cause the petals to overlap, and too large will cause them to break.
  //Make the petals relatively slender, with an aspect ratio of approximately 1:4 (petals are usually much shorter than their length and look more like "pointed ellipses," so divide by 4 to narrow them a bit.)
  rotate(PI / 6);      // Each petal rotates 30 degrees to form a circular flower
  //12 petals symmetrically distributed most naturally
  }
  fill(centerR, centerG, centerB);     // Deep yellow flower center
  ellipse(0, 0, (60 * bloom) / 2);
  fill(innerR, innerG, innerB);    // Bright yellow center point, symbolizing sunshine
  ellipse(0, 0, (60 * bloom) / 3);
  pop();

  // Flower 2
  push();
  translate(vaseX - 50, 310); // Still like this
  for (let i = 0; i < 12; i++) {
    ellipse(0, -(65 * bloom) / 2.5, (65 * bloom) / 4, (65 * bloom)); // Rhythmic size changes that look more natural, not every flower is the same size
    rotate(PI / 6);
  }
  fill(centerR, centerG, centerB);
  ellipse(0, 0, (65 * bloom) / 2); // Corresponding sized flower center
  fill(innerR, innerG, innerB);
  ellipse(0, 0, (65 * bloom) / 3); // Corresponding bright yellow center point
  pop();

  // Flower 3 (the largest one in the center, representing "noon")
  push();
  translate(vaseX, 350);
  for (let i = 0; i < 12; i++) {
    ellipse(0, -(70 * bloom) / 2.5, (70 * bloom) / 4, (70 * bloom));// Rhythmic changes in size, appearing more natural, not every flower is the same size, rhythmic movements
    rotate(PI / 6);
  }
  fill(centerR, centerG, centerB);
  ellipse(0, 0, (70 * bloom) / 2);
  fill(innerR, innerG, innerB);
  ellipse(0, 0, (70 * bloom) / 3);
  pop();
  
    // New flower (because when I finished, I thought there could be more flowers, maybe the visual effect would be better?)
  push();
  translate(vaseX - 20, 230); 
  for (let i = 0; i < 12; i++) {
    ellipse(0, -(65 * bloom) / 2.5, (65 * bloom) / 4, (65 * bloom)); 
    rotate(PI / 6);
  }
  fill(centerR, centerG, centerB);
  ellipse(0, 0, (65 * bloom) / 2);
  fill(innerR, innerG, innerB);
  ellipse(0, 0, (65 * bloom) / 3);
  pop();


  // Flower 4
  push();
  translate(vaseX + 40, 290); 
  for (let i = 0; i < 12; i++) {
    ellipse(0, -(65 * bloom) / 2.5, (65 * bloom) / 4, (65 * bloom)); 
    rotate(PI / 6);
  }
  fill(centerR, centerG, centerB);
  ellipse(0, 0, (65 * bloom) / 2);
  fill(innerR, innerG, innerB);
  ellipse(0, 0, (65 * bloom) / 3);
  pop();

  // Flower 5
  push();
  translate(vaseX + 90, 260);
  for (let i = 0; i < 12; i++) {
    ellipse(0, -(60 * bloom) / 2.5, (60 * bloom) / 4, (60 * bloom));
    rotate(PI / 6);
  }
  fill(centerR, centerG, centerB);
  ellipse(0, 0, (60 * bloom) / 2);
  fill(innerR, innerG, innerB);
  ellipse(0, 0, (60 * bloom) / 3);
  pop();

  // Flower 6
  push();
  translate(vaseX - 70, 420);
  for (let i = 0; i < 12; i++) {
  ellipse(0, -(55 * bloom) / 2.5, (55 * bloom) / 4, (55 * bloom));
  // It's still the same routine, but the values are different, forming a different rhythm
    rotate(PI / 6);
  }
  fill(centerR, centerG, centerB);
  ellipse(0, 0, (55 * bloom) / 2);
  fill(innerR, innerG, innerB);
  ellipse(0, 0, (55 * bloom) / 3);
  pop();

  // Flower 7 (bottom right)
  push();
  translate(vaseX + 29, 425); //29 was modified later so that it can be slightly misaligned
  for (let i = 0; i < 12; i++) {
    ellipse(0, -(55 * bloom) / 2.5, (55 * bloom) / 4, (55 * bloom));
    rotate(PI / 6);
  }
  fill(centerR, centerG, centerB);
  ellipse(0, 0, (55 * bloom) / 2);
  fill(innerR, innerG, innerB);
  ellipse(0, 0, (55 * bloom) / 3);
  pop();

  //flower 8
  push();
  translate(vaseX + 70, 380);
  for (let i = 0; i < 12; i++) {
    ellipse(0, -(55 * bloom) / 2.5, (55 * bloom) / 4, (55 * bloom));
    rotate(PI / 6);
  }
  fill(centerR, centerG, centerB);
  ellipse(0, 0, (55 * bloom) / 2);
  fill(innerR, innerG, innerB);
  ellipse(0, 0, (55 * bloom) / 3);
  pop();

  // Vase (later drawn to cover the upper end of the stem)
  // The vase represents the "container of time", with a stable and symmetrical shape, as if holding the flow of time.
  fill(25, 55, 110);         // Deep blue symbolizes calmness and tolerance
  stroke(25, 55, 110);
  strokeWeight(2);
  beginShape();              // Start irregular graphic painting (vase)
  // Because the vase is located in the middle and bottom of the picture, width/2 and height are used as the median values for calculation
  vertex(width / 2 - 55, height);       // Bottom left corner
  vertex(width / 2 - 60, height - 120); // close up
  vertex(width / 2 - 55, height - 220); // Left mouth edge
  vertex(width / 2 + 55, height - 220); // Right mouth edge
  vertex(width / 2 + 60, height - 120); // close up
  vertex(width / 2 + 55, height);       // Bottom right corner
  // By trying different values, currently using these values feels relatively suitable
  endShape(CLOSE);

  // Vase rim (thickened rectangle, used to "cover" the stem, looking like it is inserted into the vase)
  fill(15, 35, 80);          // Deeper colors are used to create shadows
  noStroke();
  rect(width / 2 - 60, height - 230, 120, 20); // Width 80, height 20, making the flower appear to be inserted into the bottle
  
  
  
  //Time progress bar
  // It uses second(), minute(), and hour() to show time progress visually, I only use one type of time because I want to quickly showcase the effect. In fact, I also do another type of time visualization to prevent my work from being too abstract and to convey the main idea.

  // Calculate current second progress (0 to 59): Determine the length of the small progress bar
  let secBar = map(second(), 0, 59, 0, 25);

  // Calculate the current minute progress (0 to 59): Determine the length of the medium progress bar
  let minBar = map(minute(), 0, 59, 0, 50);

  // Calculate current hourly progress (0 to 23): Determine the length of the large progress bar
  let hourBar = map(hour(), 0, 23, 0, 100);

  // The progress bar is located in the bottom left corner, and its color changes slightly over time
  noStroke();
  // Continue to use second() and map() to dynamically change color and transparency
  let cChange = map(second(), 0, 59, 100, 255);  // Control color brightness
  let alpha = map(second(), 0, 59, 150, 255);    // Control transparency

  // The color of the hour bar is slightly cool blue, and the transparency fluctuates slightly with time
  fill(180, 200, cChange, alpha);
  rect(20, height - 60, hourBar, 8);

  // The color of the minute bar tends to be light blue and also changes slightly over time
  fill(200, cChange, 240, alpha);
  rect(20, height - 45, minBar, 6);

  // The second bar is the brightest, flashing rapidly every second
  fill(cChange, 240, 255, alpha);
  rect(20, height - 32, secBar, 4);  

  // Annotation
  fill(255);
  textSize(12);
  text(hour() + ':' + minute() + ':' + second(), 20, height - 10);//The text above the corner represents the actual elapsed time, but the scene is an abstract representation of it. 
}

