//global declaration of GameState object
let tankGame;
let startingScreen;
let twoPlayerMode;
let setupStage;
let endOfGame;
let controllersImg;

//key codes for firing of tanks
let SPACE_CODE = 32;
let Q_CODE = 81;

let maxGames = 5;

function preload() {

    //audio file preloads
    audioBombExplode = loadSound('audio/bombExplode.mp3');
    audioBombShot    = loadSound('audio/bombShot.mp3');
    audioBulletShot  = loadSound('audio/bulletShot.mp3');
    audioLaserShot   = loadSound('audio/laserShot.mp3');
    audioMediumHit   = loadSound('audio/mediumHit.mp3');
    audioTankDestroy = loadSound('audio/tankDestroy.mp3');

    //image file preloads
    imgAmmoIcon     = loadImage('images/ammo-icon.webp');
    imgAmmoPickup   = loadImage('images/ammo-pickup.webp');
    imgBombIcon     = loadImage('images/bomb-icon.webp');
    imgBombPickup   = loadImage('images/bomb-pickup.webp');
    imgHealthIcon   = loadImage('images/health-icon.webp');
    imgHealthPickup = loadImage('images/health-pickup.webp');
    imgLaserIcon    = loadImage('images/laser-icon.webp');
    imgLaserPickup  = loadImage('images/laser-pickup.webp');
    imgSawIcon      = loadImage('images/saw-icon.webp');
    imgSawPickup    = loadImage('images/saw-pickup.webp');
    imgSpeedIcon    = loadImage('images/speed-icon.webp');
    imgSpeedPickup  = loadImage('images/speed-pickup.webp');
    imgTankGreen    = loadImage('images/tank-image-green.webp');
    imgTankRed      = loadImage('images/tank-image-red.webp');
}

function setup() {
    //standardise frame rate to ensure animations and speed consistent
    //accross different machines
    frameRate(30);
    setupStage = true;
    startingScreen = new GameSetup();
    controllersImg = loadImage('Controllers.png');
}

function draw() {
    if(setupStage){
        startingScreen.draw();
    }
    else if(tankGame.getGameOverCnt() >= maxGames){
        endOfGame = true;
        gameEndScreen = new GameFinish();
        if(endOfGame){    
            gameEndScreen.draw();
        }
    }
    else{
        tankGame.draw();
        tankGame.update();
    }
}

function keyPressed() {
    
    //setup-stage control handling
    if(setupStage){
        //check whether user is ready to begin game
        if(keyCode === ENTER){
            tankGame = new GameState();
            setupStage = false;
            //startingScreen can be garbage collected
            startingScreen = null;
        //otherwise run the usual key listening method
        }else{
            startingScreen.keyListening();
        }

    //in-game control handling
    }
    else if(endOfGame){
        if(keyCode === ENTER){
            allSprites.remove();
            endOfGame = false;
            this.setup();
            gameEndScreen = null;
        }
    }
    else{
        //detect if tank 1 (human player) has fired
        if (keyCode === SPACE_CODE && !tankGame.getIsGameOver() && !GameState.showMapGeneration) {
                if(tankGame.tankList[0].canFire()){
                    tankGame.addProjectile(tankGame.tankList[0].fire(), tankGame.tankList[0]);
                }
        }

        //if the game in two player mode, detect if tank 2 fired
        if(GameState.twoPlayerMode){
            if (keyCode === Q_CODE && !tankGame.getIsGameOver() && !GameState.showMapGeneration) {
                    if(tankGame.tankList[1].canFire()){    
                        tankGame.addProjectile(tankGame.tankList[1].fire(), tankGame.tankList[1]);
                    }
            }
        }
    }
}

function mousePressed() {
    if (setupStage) {
        startingScreen.mousePressed();
    } else if (endOfGame && keyCode === ENTER) {
        allSprites.remove();
        endOfGame = false;
        setup();
        gameEndScreen = null;
    }
}
