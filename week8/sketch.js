 let t = 0, speed = 0.1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
}

function draw() {
// noise()
// random()
  noise(100)
  circle(100,noise(100),100)
 
  let v = noise(t);   // 平滑变化
  t = t + speed;      // 
  circle(100,noise(t)*200,100)
  circle(t,noise(t)*700,300)
}
