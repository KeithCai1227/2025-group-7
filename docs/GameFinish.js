class GameFinish{

    gameWinnerX = 265;
    gameWinnerY = 350;
    drawX = 375;
    drawY = 350;
    gameCompleteX = 200;
    gameCompleteY = 200;
    newGameX = 320;
    newGameY = 500;
    newGameRectX = 490;
    newGameRectY = 515;
    newGameRectWidth = 450;
    newGameRectHeight = 60;
    
    constructor(endImage, VT323Font){
        createCanvas(GameState.CANVAS_WIDTH, GameState.CANVAS_HEIGHT);
        displayMode('centered');
    }

    draw(){
        textAlign(LEFT, TOP);
        background(endImage);
        
        strokeWeight(10);
        fill('white');
        textFont(VT323Font);
        textSize(110);
        text("GAME COMPLETE", this.gameCompleteX, this.gameCompleteY);

        // display the winner
        strokeWeight(0);
        textSize(80);
        if(GameState.currentWinner != "Draw") text(GameState.currentWinner + " wins!", this.gameWinnerX, this.gameWinnerY);
        else{
            text(GameState.currentWinner + "!", this.drawX, this.drawY);
        }

        strokeWeight(2);
        rect(this.newGameRectX, this.newGameRectY, this.newGameRectWidth, this.newGameRectHeight);
        fill('black');
        strokeWeight(0);
        textSize(35);
        text("Press Enter for New Game", this.newGameX, this.newGameY);

        // add selector if more options added to screen 

        strokeWeight(1);

    }


}