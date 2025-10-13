// Assignment 4: Object Factory（Performing version）
// Draw a pizza.
// Use translate() to place the center at (200,200).
// When I was preparing the ingredients, the initial random range was too large, and the ingredients would run outside the edges;
// After reducing the range to 0.35 times the diameter, most of the ingredients fall into the pizza dough, making it look more natural.

let onePizza; // Just make one for now, to check if the position is accurate

function setup() {
  createCanvas(800, 600);
  // Order a pizza: flavor, size, quantity of ingredients, location
  onePizza = new Pizza("cheese", 140, 8, 200, 200);
}

function draw() {
  background(240);
  onePizza.display(); // Draw the pizza every frame
}

// Pizza category: Control appearance with four parameters: taste, size, ingredient quantity, and location
class Pizza {
  constructor(kind, size, toppingNumber, x, y) {
    this.kind = kind;                 // "cheese",  "pepperoni",  "mushroom"
    this.size = size;                 // Diameter
    this.toppingNumber = toppingNumber; // The quantity of ingredients is determined by the cycle to draw how many
    this.x = x;                       // Center X
    this.y = y;                       // Center Y
  }

  display() {
    push();
    // First, move the coordinate origin to the center of the pizza, so that all subsequent drawings are centered around (0,0)
    translate(this.x, this.y);

    // Bottom cake: a deeper outer ring
    noStroke();
    fill(230, 200, 140);
    ellipse(0, 0, this.size, this.size);

    // Cheese layer: slightly smaller circle, allowing the outer ring to be exposed as the "edge"
    fill(245, 225, 120);
    ellipse(0, 0, this.size * 0.9, this.size * 0.9);

    // Method of ingredient drawing for three flavors (switching with conditional branches)
    if (this.kind == "cheese") {
      // Cheese: Decorate with light yellow dots
      // The ingredient positions are randomly placed in squares with a diameter of plus or minus 0.35 * to avoid being too close to the side
      fill(255, 245, 170);
      for (let i = 0; i < this.toppingNumber; i++) {
        let toppingX = random(-this.size * 0.35, this.size * 0.35);
        let toppingY = random(-this.size * 0.35, this.size * 0.35);
        ellipse(toppingX, toppingY, this.size * 0.06, this.size * 0.06);
      }

    } else if (this.kind == "pepperoni") {
      // Spicy sausage: red round piece
      // Choose larger discs than cheese to distinguish flavors
      fill(200, 60, 60);
      for (let i = 0; i < this.toppingNumber; i++) {
        let toppingX = random(-this.size * 0.35, this.size * 0.35);
        let toppingY = random(-this.size * 0.35, this.size * 0.35);
        ellipse(toppingX, toppingY, this.size * 0.12, this.size * 0.12);
      }

    } else if (this.kind == "mushroom") {
      // Mushroom: upper semicircle+small rectangle
      // I initially reversed the order of the radians, with direction facing downwards; Change PI to 0 and it becomes the upper half circle
      fill(200, 190, 170);
      for (let i = 0; i < this.toppingNumber; i++) {
        let toppingX = random(-this.size * 0.35, this.size * 0.35);
        let toppingY = random(-this.size * 0.35, this.size * 0.35);
        // Cap: Upper semicircle
        arc(toppingX, toppingY, this.size * 0.16, this.size * 0.12, PI, 0);
        // Stem: small rectangle
        // I hope the stem is centered below the toppingX position; Since w=this. size * 0.04, 
        // half of it is this. size * 0.02. Therefore, use toppingX - (stemW/2) to shift the left side of the rectangle half a width to the left, 
        // aligning the center of the rectangle with toppingX. I placed the top of the stem near the center height of the mushroom cap curve (toppingY). 
        // The actual effect looks natural.
        rect(toppingX - this.size * 0.02, toppingY, this.size * 0.04, this.size * 0.06);
        // Make the stem width about 1/4 of the cap width, which looks natural: 0.16 ÷ 4 ≈ 0.04
        // Take about half of the stem height to make the ratio pleasing to the eye: 0.12 × 0.5=0.06
      }
    }

    pop(); // Restore coordinates and styles to avoid affecting other graphics
  }
}