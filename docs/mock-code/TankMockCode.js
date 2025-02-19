//global declaration of Tank array and objects
let tanks = [];
let tank1;
let tank2;
let l;
//spacebar is keycode 32
let SPACEBAR_CODE = 32;
let Q_CODE = 81;

function setup() {
    createCanvas(640, 480);
    let s = new Sprite(200, 200, 200, 200, 'static');
	s.shape = 'chain';
    tank1 = new Tank(200, 200, 90, new Weapon(Weapon.BULLET_TYPE));
    tanks.push(tank1);
    tank2 = new Tank(150, 200, 90, new Weapon(Weapon.BULLET_TYPE));
    tanks.push(tank2);
    l = new KeyListener(tanks);
    
}

function draw() {
    background(200, 200, 200);
    tank1.draw();
    tank2.draw();
    tank1.update();
    tank2.update();
    l.listenForKeys();
    
}

//detect if spacebar/q is pressed to fire bullet of tank
//not sure if this can be added to keylistener class

function keyPressed() {
    if (keyCode === SPACEBAR_CODE) {
        tank1.fire();
    }
    if (keyCode === Q_CODE) {
        tank2.fire();
    }

}
