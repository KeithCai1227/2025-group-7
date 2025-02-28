//global declaration of GameState object
let tankGame;

let twoPlayerMode;

//key codes for firing of tanks
let ZERO_NUMPAD_CODE = 48;
let Q_CODE = 81;

function setup() {
    twoPlayerMode = false;
    tankGame = new GameState(GameState.EASY, GameState.HARD, twoPlayerMode);   
}

function draw() {
    tankGame.draw();
    tankGame.update();
}

function keyPressed() {
    //detect if tank 1 (human player) has fired
    if (keyCode === ZERO_NUMPAD_CODE && tankGame.tankList[0].canFire() && !tankGame.getIsGameOver()){
        tankGame.addProjectile(tankGame.tankList[0].fire());
    }

    //if the game in two player mode, detect if tank 2 fired
    if(twoPlayerMode){
        if (keyCode === Q_CODE && tankGame.tankList[1].canFire() && !tankGame.getIsGameOver()) {
            tankGame.addProjectile(tankGame.tankList[1].fire());
        }
    }
}
