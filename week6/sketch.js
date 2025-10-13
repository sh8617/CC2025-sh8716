let x = 0
let y = 0
let d = 20
let speed = 1
let hue = 22
let opacity = 200
 //弄各种变量

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width/2
  y = height/2
  colorMode(HSB)
  
}

function draw() {
  x = x + random(-speed, speed)
  y = y + random()
  fill(hue,x,x,opacity)
  circle(x,y,d)
  
}

function drawDrunk(speed,hue,diameter) {
  
} 
//定义函数
//来不及写了，继续专心听，就是将drunk里的参数替换draw里的，然后 draw里改成:"drawDrunk(x,x,x)"
//老师把上面的draw复制进去了

class Drunk {
  constructon(x,y,diameter,speed,hue){
    
  }
}