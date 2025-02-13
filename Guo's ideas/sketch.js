let tankspeed = 2;
let tank1 = {
  x: 50,
  y: 50,
  angle: 0,
  bullets: [],
  alive: true,
  controls: { up: 'W', down: 'S', left: 'A', right: 'D', shoot: ' ' }
};


let tank2 = {
  x: 750,
  y: 550,
  angle: Math.PI,
  bullets: [],
  alive: true,
  controls: {}
};

let gameOver = false;


let walls = [];

function setup() {
  createCanvas(800, 620);


  tank2.controls.up = UP_ARROW;
  tank2.controls.down = DOWN_ARROW;
  tank2.controls.left = LEFT_ARROW;
  tank2.controls.right = RIGHT_ARROW;
  tank2.controls.shoot = ENTER;

  generateWalls();
}


function draw() {
  background(220);

if (gameOver) {
    displayGameOverScreen();
    return; 
  }
  
  if (tank1.alive) {
    updateTank(tank1);
    drawTank(tank1.x, tank1.y, tank1.angle, color(50, 100, 200));
  }


  if (tank2.alive) {
    updateTank(tank2);
    drawTank(tank2.x, tank2.y, tank2.angle, color(200, 50, 50));
  }

 
  checkBulletHitTank(tank1, tank2);
  checkBulletHitTank(tank2, tank1);


  for (let wall of walls) {
    if (wall.alive) { 
      wall.display();
    }
  }
}
function checkBulletHitTank(tank, otherTank) {
  for (let i = 0; i < tank.bullets.length; i++) {
    let bullet = tank.bullets[i];

    if (dist(bullet.x, bullet.y, otherTank.x, otherTank.y) < 15 && otherTank.alive) {
      otherTank.alive = false;
      gameOver = true;

      return;
    }
  }
}


function displayGameOverScreen() {
  fill(0, 0, 0, 150); 
  rect(0, 0, width, height);

  fill(255);
  textSize(40);
  textAlign(CENTER, CENTER);
  text("game over", width / 2, height / 3);
  textSize(20);
 
}


function updateTank(tank) {
  let nextX = tank.x;
  let nextY = tank.y;


  if (keyIsDown(keyCodeFromString(tank.controls.up))) {
    nextX += tankspeed * cos(tank.angle);
    nextY += tankspeed * sin(tank.angle);
  }
  if (keyIsDown(keyCodeFromString(tank.controls.down))) {
    nextX -= 2 * cos(tank.angle);
    nextY -= 2 * sin(tank.angle);
  }
  if (keyIsDown(keyCodeFromString(tank.controls.left))) {
    tank.angle -= 0.05;
  }
  if (keyIsDown(keyCodeFromString(tank.controls.right))) {
    tank.angle += 0.05;
  }

 
  if (!checkTankCollision(nextX, nextY)) {
    tank.x = nextX;
    tank.y = nextY;
  }

  for (let i = tank.bullets.length - 1; i >= 0; i--) {
    tank.bullets[i].update();

    
    if (tank.bullets[i].lifetime <= 0) {
      tank.bullets.splice(i, 1);
      continue;
    }

   
    let bounceResult = checkBulletCollision(tank.bullets[i]);
    if (bounceResult) {
      if (bounceResult === "horizontal") {
        tank.bullets[i].angle = -tank.bullets[i].angle;
      } else if (bounceResult === "vertical") {
        tank.bullets[i].angle = Math.PI - tank.bullets[i].angle;
      }
    }

    tank.bullets[i].display();
  }
}


function drawTank(x, y, angle, tankColor) {
  push();
  translate(x, y);
  rotate(angle);
  fill(tankColor);
  rect(-15, -10, 30, 20); 
  fill(100, 200, 50);
  rect(0, -3, 20, 6); 
  pop();
}


function generateWalls() {
  walls = [];


  walls.push(new Wall(0, 0, width, 10, Infinity, color(50, 50, 50))); 
  walls.push(new Wall(0, height - 10, width, 10, Infinity, color(50, 50, 50))); 
  walls.push(new Wall(0, 0, 10, height, Infinity, color(50, 50, 50))); 
  walls.push(new Wall(width - 10, 0, 10, height, Infinity, color(50, 50, 50))); 
  walls.push(new Wall(350, 150, 100, 10, Infinity, randomColor())); 
  walls.push(new Wall(390, 200, 10, 100, Infinity, randomColor())); 
  walls.push(new Wall(300, 250, 50, 10, Infinity, randomColor())); 
  walls.push(new Wall(450, 250, 50, 10, Infinity, randomColor())); 

  walls.push(new Wall(100, 100, 150, 10, Infinity, randomColor()));
  walls.push(new Wall(150, 200, 10, 100, Infinity, randomColor())); 
  walls.push(new Wall(550, 100, 150, 10, Infinity, randomColor())); 
  walls.push(new Wall(600, 200, 10, 100, Infinity, randomColor())); 

  walls.push(new Wall(100, 500, 150, 10, Infinity, randomColor())); 
  walls.push(new Wall(150, 400, 10, 100, Infinity, randomColor())); 
  walls.push(new Wall(550, 500, 150, 10, Infinity, randomColor())); 
  walls.push(new Wall(600, 400, 10, 100, Infinity, randomColor())); 


  walls.push(new Wall(300, 400, 200, 10, Infinity, randomColor())); 
  walls.push(new Wall(300, 300, 10, 100, Infinity, randomColor())); 
  walls.push(new Wall(500, 300, 10, 100, Infinity, randomColor())); 

  walls.push(new Wall(200, 350, 50, 10, 5, color(255, 0, 0))); 
  walls.push(new Wall(550, 350, 50, 10, 5, color(255, 0, 0))); 
  walls.push(new Wall(300, 550, 50, 10, 5, color(255, 0, 0))); 
  walls.push(new Wall(450, 550, 50, 10, 5, color(255, 0, 0))); 

  walls.push(new Wall(50, 250, 50, 10, Infinity, randomColor())); 
  walls.push(new Wall(700, 250, 50, 10, Infinity, randomColor())); 
}


class Wall {
  constructor(x, y, w, h, health = 5, wallColor = color(100)) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.health = health;
    this.alive = true;
    this.wallColor = wallColor; 
  }

  display() {
    if (this.alive) {
      fill(this.wallColor);
      rect(this.x, this.y, this.w, this.h);
    }
  }

  hit() {
    this.health--;
    if (this.health <= 0) {
      this.alive = false;
    }
  }
}

function randomColor() {
  return color(random(100, 255), random(100, 255), random(100, 255));
}


class Bullet {
  constructor(x, y, angle) {
    this.x = x + 20 * cos(angle);
    this.y = y + 20 * sin(angle);
    this.angle = angle;
    this.speed = 5;
    this.lifetime = 300; 
  }

  update() {
    this.x += this.speed * cos(this.angle);
    this.y += this.speed * sin(this.angle);
    this.lifetime--;
  }

  display() {
    fill(255, 0, 0);
    ellipse(this.x, this.y, 5, 5);
  }
}


function checkTankCollision(x, y) {
  for (let wall of walls) {
    if (wall.alive && rectCircleCollision(x, y, 15, 10, wall.x, wall.y, wall.w, wall.h)) {
      return true;
    }
  }
  return false;
}

function checkBulletCollision(bullet) {
  for (let wall of walls) {
    if (wall.alive && bullet.x > wall.x && bullet.x < wall.x + wall.w &&
        bullet.y > wall.y && bullet.y < wall.y + wall.h) {
      
      wall.hit(); 

      let left = abs(bullet.x - wall.x);
      let right = abs(bullet.x - (wall.x + wall.w));
      let top = abs(bullet.y - wall.y);
      let bottom = abs(bullet.y - (wall.y + wall.h));

      let minDist = min(left, right, top, bottom);

      if (minDist === left || minDist === right) {
        return "vertical";
      } else {
        return "horizontal";
      }
    }
  }
  return false;
}

function rectCircleCollision(cx, cy, halfWidth, halfHeight, rx, ry, rw, rh) {
  let closestX = constrain(cx, rx, rx + rw);
  let closestY = constrain(cy, ry, ry + rh);

  let distanceX = cx - closestX;
  let distanceY = cy - closestY;

  return (distanceX * distanceX + distanceY * distanceY) < (halfWidth * halfWidth);
}

function keyCodeFromString(key) {
  if (typeof key === 'number') return key;
  return key.toUpperCase().charCodeAt(0);
}

function keyPressed() {
  if (key === tank1.controls.shoot) {
    tank1.bullets.push(new Bullet(tank1.x, tank1.y, tank1.angle));
  } else if (keyCode === tank2.controls.shoot) {
    tank2.bullets.push(new Bullet(tank2.x, tank2.y, tank2.angle));
  }
}