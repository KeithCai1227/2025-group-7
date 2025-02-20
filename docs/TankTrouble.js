//global declaration of GameState object
let tankGame;

//spacebar is keycode 32
let SPACEBAR_CODE = 32;
let Q_CODE = 81;

function setup() {
    tankGame = new GameState();   
}

function draw() {
    tankGame.draw();
    tankGame.update();
}

function keyPressed() {
    if (keyCode === SPACEBAR_CODE) {
        tankGame.addProjectile(tankGame.tankList[0].fire());
    }
    if (keyCode === Q_CODE) {
        tankGame.addProjectile(tankGame.tankList[1].fire());
    }
}
