//global declaration of Tank object
let myTank;
//spacebar is keycode 32
let SPACEBAR_CODE = 32;

function setup() {
    createCanvas(640, 480);
    let s = new Sprite(200, 200, 200, 200, 'static');
	s.shape = 'chain';
    myTank = new Tank(200, 200, 45, new Weapon(Weapon.BULLET_TYPE));
}

function draw() {
    background(200, 200, 200);
    myTank.draw();
    myTank.update();

    if(keyIsDown(LEFT_ARROW)){
        myTank.move(Tank.LEFT_DIRECTION);
    }
    else if(keyIsDown(RIGHT_ARROW)){
        myTank.move(Tank.RIGHT_DIRECTION);
    }

    if(keyIsDown(UP_ARROW)){
        myTank.move(Tank.UP_DIRECTION);
    }
    else if(keyIsDown(DOWN_ARROW)){
        myTank.move(Tank.DOWN_DIRECTION);
    }
    else{
        myTank.move(Tank.NO_DIRECTION);
    }
}

//detect if spacebar is pressed to fire bullet of tank
function keyPressed() {
    if (keyCode === SPACEBAR_CODE) {
        myTank.fire();
    }
}
