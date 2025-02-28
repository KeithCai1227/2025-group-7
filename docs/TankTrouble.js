//global declaration of GameState object
let tankGame;

//key codes for firing of tanks
let ZERO_NUMPAD_CODE = 96;
let Q_CODE = 81;

function setup() {
    tankGame = new GameState(GameState.EASY, GameState.HARD, true);   
}

function draw() {
    tankGame.draw();
    tankGame.update();
}

function keyPressed() {
    if (keyCode === ZERO_NUMPAD_CODE && tankGame.tankList[0].canFire() && !tankGame.getIsGameOver()){
        tankGame.addProjectile(tankGame.tankList[0].fire());
    }
    if (keyCode === Q_CODE && tankGame.tankList[1].canFire() && !tankGame.getIsGameOver()) {
        tankGame.addProjectile(tankGame.tankList[1].fire());
    }
}
