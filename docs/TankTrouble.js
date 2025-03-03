//global declaration of GameState object
let tankGame;
let startingScreen;
let twoPlayerMode;
let setupStage;

//key codes for firing of tanks
let ZERO_CODE = 48;
let Q_CODE = 81;

function setup() {
    setupStage = true;
    startingScreen = new GameSetup();
}

function draw() {
    if(setupStage){
        startingScreen.draw();
    }else{
        tankGame.draw();
        tankGame.update();
    }
}

function keyPressed() {
    
    //setup-stage control handling
    if(setupStage){
        //check whether user is ready to begin game
        if(keyCode === ENTER && startingScreen.selector === startingScreen.ON_START){
            tankGame = new GameState();
            setupStage = false;
            //startingScreen can be garbage collected
            startingScreen = null;
        //otherwise run the usual key listening method
        }else{
            startingScreen.keyListening();
        }

    //in-game control handling
    }else{
        //detect if tank 1 (human player) has fired
        if (keyCode === ZERO_CODE && tankGame.tankList[0].canFire() && !tankGame.getIsGameOver()){
            tankGame.addProjectile(tankGame.tankList[0].fire());
        }

        //if the game in two player mode, detect if tank 2 fired
        if(GameState.twoPlayerMode){
            if (keyCode === Q_CODE && tankGame.tankList[1].canFire() && !tankGame.getIsGameOver()) {
                tankGame.addProjectile(tankGame.tankList[1].fire());
            }
        }
    }
}
