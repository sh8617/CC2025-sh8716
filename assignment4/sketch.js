// Assignment 4: Object Factory (Full version)
// I work in a pizza factory. There are three flavors inside: cheese, peperoni, and mushroom.
// Technical points: class, array, for loop, condition, random(), translate(), push(), pop(), dist(), mousePressed(), keyPressed(), second()。
// Draw a "static" example of food. At the beginning, place a pizza in (200,200), and when the object is translated to 200,200, it should be placed at the center of 200200.

let pizzas = [];       // Store a lot of pizza
let lastSec;      // I use second() to do 'once per second', and lastSec records the previous second to avoid adding multiple times in one second
let baseSize = 140;    // Pizza base diameter (with slight fluctuations around this value)

function setup() {
  createCanvas(800, 600);

  // Static Example
  // First, place a pizza with fixed parameters and check if the coordinates are accurate
  let onePizza = new Pizza("cheese", 140, 8, 200, 200);
  pizzas.push(onePizza);
}

function draw() {
  // I fixed the background color to brown, which is close to the wooden dining table, for a more unified picture
  background(107, 71, 24);

  // I want to make a random pizza that automatically appears every second
  // At the beginning, pushing directly in the draw will add a stack of frames; Later, it was changed to compare whether there was a change in second(), only adding once in the "new second"
  let now = second();
  if (now != lastSec) {
    addRandomPizza();
    lastSec = now;
  }

  // Draw all the pizzas one by one
  for (let i = 0; i < pizzas.length; i++) {
    pizzas[i].display();
  }

  // Simple text prompts
  fill(0);
  noStroke();
  textSize(10);
  text("Add cheese pizza to C, spicy sausage pizza to P, and mushroom pizza to M; Click on pizza to delete", 12, height - 14);
}

// Click to prioritize trying to 'delete the pizza that was clicked'; If not clicked, create a new one on the mouse
function mousePressed() {
  // I will search from front to back and delete any hits.
  // I hope to delete everything that overlaps with each other with just one click (I think it's more direct after trying)
  for (let i = 0; i < pizzas.length; i++) {
    let p = pizzas[i];
    let d = dist(mouseX, mouseY, p.x, p.y); // Use the distance between the center of the circle to determine if the point is in the center
    if (d <= p.size * 0.5) {
      pizzas.splice(i, 1);  // Delete the one that was clicked on
      i = i - 1;            // After deletion, call the index back one bit to avoid skipping the next element (this is the point I stepped on during debugging)
    }
  }

  // If none of them have been deleted, create a new one at the mouse position
  // I choose the flavor by dividing 0~1 into three equal parts
  // Divide the interval from 0 to 1 into three equal parts: [0,1/3), [1/3,2/3), and [2/3,1).
  // Choose the corresponding flavor for which segment 'r' falls. There is a probability of about 1/3 for each of these three flavors.
  let r = random(1); // R is a decimal from 0 to 1
  let pick;
  if (r < 1/3) {
    pick = "cheese";
  } else if (r < 2/3) {
    pick = "pepperoni";
  } else {
    pick = "mushroom";
  }

  let s = random(baseSize * 0.8, baseSize * 1.2); // Slightly adjust the size to make the image more vivid
  let count = floor(random(6, 13));               // Quantity and rounding of ingredients
  let newPizza = new Pizza(pick, s, count, mouseX, mouseY)
  pizzas.push(newPizza);
}

// Key: Press C/P/M to generate a specified flavor at a random position on the canvas
function keyPressed() {
  // I have kept the version with a fixed diameter of 150 here (for easy observation), and the position is random
  if (key == 'C' || key == 'c') {
    pizzas.push(new Pizza("cheese", 150, 10, random(120, width - 120), random(120, height - 120)));
  } else if (key == 'P' || key == 'p') {
    pizzas.push(new Pizza("pepperoni", 150, 12, random(120, width - 120), random(120, height - 120)));
  } else if (key == 'M' || key == 'm') {
    pizzas.push(new Pizza("mushroom", 150, 8, random(120, width - 120), random(120, height - 120)));
  }
}

// Random New Pizza Used Every Second
function addRandomPizza() {
  let pick;
  let r = random(1);
  if (r < 1/3) {
    pick = "cheese";
  } else if (r < 2/3) {
    pick = "pepperoni";
  } else {
    pick = "mushroom";
  }

 
  // I changed it to be on the side (even slightly beyond) here, giving the picture a more "cluttered" feeling
  let s = random(baseSize * 0.8, baseSize * 1.2);
  let count = floor(random(6, 13));
  let rx = random(0, width);
  let ry = random(0, height);
  let newPizza = new Pizza(pick, s, count, rx, ry)
  pizzas.push(newPizza);
}

// Pizza class
// Parameters: kind (flavor), size (diameter), toppingNumber (ingredient quantity), x/y (center position)
class Pizza {
  constructor(kind, size, toppingNumber, x, y) {
    this.kind = kind;
    this.size = size;
    this.toppingNumber = toppingNumber;
    this.x = x;
    this.y = y;
  }

  display() {
    push();
    // Move the coordinate origin to the center of the pizza: draw the shapes around (0,0) for a more intuitive understanding
    translate(this.x, this.y);

    // Bottom cake+cheese layer (make the cheese diameter slightly smaller, exposing the outer edge)
    noStroke();
    fill(209, 169, 105);
    ellipse(0, 0, this.size, this.size);

    fill(237, 212, 150);
    ellipse(0, 0, this.size * 0.9, this.size * 0.9);

    // The ingredients are evenly distributed according to the "clock" and arranged in a circle
    // I want to change the ingredients from "randomly scattered" to "evenly distributed around the center of the circle", which is more like the neat arrangement in reality
    // Divide 360 ° into toppingNumber equal parts, with each part having an angle.
    // Choose a radius slightly inside the cheese edge (* 0.33 and * 0.32) to avoid the edge appearing to fall off
    let ringCheese = this.size * 0.33; // Cheese in small pieces, slightly closer to the center
    let ringPepperoni = this.size * 0.33; // Spicy sausage has a larger diameter but the same radius, making it visually fuller
    let ringMushroom = this.size * 0.32; // There is a handle under the mushroom, I make it slightly inward so it won't reach the edge

    if (this.kind == "cheese") {
      fill(255, 245, 170);
      for (let i = 0; i < this.toppingNumber; i++) {
        // Angle=(whole circle 2 π) * current serial number/total quantity
        let angle = TWO_PI * i / this.toppingNumber;
        let x1 = cos(angle) * ringCheese;
        let y1 = sin(angle) * ringCheese;
        // Convert the position of the angle and radius to the x and y coordinates on the canvas, so that the ingredients can be evenly placed around the center circle of the pizza
        ellipse(x1, y1, this.size * 0.06, this.size * 0.06);
      }

    } else if (this.kind == "pepperoni") {
      fill(200, 60, 60);
      for (let i = 0; i < this.toppingNumber; i++) {
        let angle = TWO_PI * i / this.toppingNumber;
        let x1 = cos(angle) * ringPepperoni;
        let y1 = sin(angle) * ringPepperoni;
        ellipse(x1, y1, this.size * 0.12, this.size * 0.12);
      }

    } else if (this.kind == "mushroom") {
      // Mushrooms are composed of an upper semicircle and a rectangular stem.
      // I placed the center of the semicircle at (x1, y1), and then placed the rectangle of the "handle" slightly below the semicircle.
      // The parameter for rect is the top left corner, so it needs to be aligned to x1 with the center half width.
      fill(200, 190, 170);
      for (let i = 0; i < this.toppingNumber; i++) {
        let angle = TWO_PI * i / this.toppingNumber;
        let x1 = cos(angle) * ringMushroom;
        let y1 = sin(angle) * ringMushroom;

        // Cap (upper half circle, angle from PI to 0)
        arc(x1, y1, this.size * 0.16, this.size * 0.12, PI, 0);

        // Stem (rectangular), align its center to x1: top left corner=center x1- width/2
        // The width here is 0.04 * size, so use 0.02 * size to make half width
        rect(x1 - this.size * 0.02, y1, this.size * 0.04, this.size * 0.06);
      }
    }

    pop();
  }
}
