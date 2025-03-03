class GameSetup{
    
    //the canvas parameters duplicates of those from GameState
    //ideally single source of truth
    CANVAS_WIDTH = 960;
    CANVAS_HEIGHT = 680;

    HEAD_TEXT = 75;
    REG_TEXT = 25;
    VERT_SP = 125;
    BELOW_TITLE = 225;

    ON_MODE = 0;
    ON_P1DIFF = 1;
    ON_P2DIFF = 2;
    ON_START = 3;

    twoPlayerMode;
    player1difficulty;
    player2difficulty;

    constructor(){
        //initial game settings
        this.twoPlayerMode = true;
        this.player1difficulty = GameState.EASY;
        this.player2difficulty = GameState.EASY;

        this.selector = this.ON_MODE;
    }

    draw(){
        background(200, 200, 200);

        //display the game title
        textFont('Courier New');
        fill('black');
        textStyle(BOLD);
        textSize(this.HEAD_TEXT);
        textAlign(CENTER, TOP);
        text('Tank Trouble', this.CANVAS_WIDTH/2, 25);

        //put in user selection box
        rectMode(CENTER);
        fill('black');
        rect(this.CANVAS_WIDTH/2 + 175, this.BELOW_TITLE + this.selector*this.VERT_SP + this.REG_TEXT/2, 500, 100);
        fill(200, 200, 200);
        strokeWeight(0);
        rect(this.CANVAS_WIDTH/2 + 175, this.BELOW_TITLE + this.selector*this.VERT_SP + this.REG_TEXT/2, 490, 90);
        rect(this.CANVAS_WIDTH/2 + 175, this.BELOW_TITLE + this.selector*this.VERT_SP + this.REG_TEXT/2, 500, 50);
        rect(this.CANVAS_WIDTH/2 + 175, this.BELOW_TITLE + this.selector*this.VERT_SP + this.REG_TEXT/2, 400, 100);

        //put in mode selection
        fill('black');
        textSize(this.REG_TEXT);
        textAlign(RIGHT, TOP);
        text('NUMBER OF PLAYERS:', this.CANVAS_WIDTH/2 - 100, this.BELOW_TITLE);

        //put in difficulty selection
        text('PLAYER 1 DIFFICULTY:', this.CANVAS_WIDTH/2 - 100, this.BELOW_TITLE + this.VERT_SP);
        text('PLAYER 2 DIFFICULTY:', this.CANVAS_WIDTH/2 - 100, this.BELOW_TITLE + 2*this.VERT_SP);

        //put in player mode boxes
        textAlign(CENTER, TOP);
        //rect(this.CANVAS_WIDTH/2 - 50, 225, 200, this.REG_TEXT);
        text('ONE PLAYER', this.CANVAS_WIDTH/2 + 50, this.BELOW_TITLE);
        text('TWO PLAYER', this.CANVAS_WIDTH/2 + 300, this.BELOW_TITLE);

        //put in difficulty boxes
        text('EASY', this.CANVAS_WIDTH/2 + 50, this.BELOW_TITLE + this.VERT_SP);
        text('EASY', this.CANVAS_WIDTH/2 + 50, this.BELOW_TITLE + 2*this.VERT_SP);
        text('HARD', this.CANVAS_WIDTH/2 + 300, this.BELOW_TITLE + this.VERT_SP);
        text('HARD', this.CANVAS_WIDTH/2 + 300, this.BELOW_TITLE + 2*this.VERT_SP);

        //put in "start game"
        text('START GAME', this.CANVAS_WIDTH/2 + 175, this.BELOW_TITLE + 3*this.VERT_SP);

        //highlight player mode selection
        fill('black');
        if(this.twoPlayerMode){
            rect(this.CANVAS_WIDTH/2 + 50, this.BELOW_TITLE + this.REG_TEXT/2, 200, this.REG_TEXT + 25);
            fill('white');
            text('ONE PLAYER', this.CANVAS_WIDTH/2 + 50, 225);
        }else{
            rect(this.CANVAS_WIDTH/2 + 300, this.BELOW_TITLE + this.REG_TEXT/2, 200, this.REG_TEXT + 25);
            fill('white');
            text('TWO PLAYER', this.CANVAS_WIDTH/2 + 300, 225);
        }

        //highlight difficulty selection for player 1
        fill('black');
        if(this.player1difficulty === GameState.EASY){
            rect(this.CANVAS_WIDTH/2 + 50, this.BELOW_TITLE + this.VERT_SP + this.REG_TEXT/2, 100, this.REG_TEXT + 25);
            fill('white');
            text('EASY', this.CANVAS_WIDTH/2 + 50, 350);
        }else{
            rect(this.CANVAS_WIDTH/2 + 300, this.BELOW_TITLE + this.VERT_SP + this.REG_TEXT/2, 100, this.REG_TEXT + 25);
            fill('white');
            text('HARD', this.CANVAS_WIDTH/2 + 300, 350);
        }

        //highlight difficulty selection for player 2
        fill('black');
        if(this.player2difficulty === GameState.EASY){
            rect(this.CANVAS_WIDTH/2 + 50, this.BELOW_TITLE + 2*this.VERT_SP + this.REG_TEXT/2, 100, this.REG_TEXT + 25);
            fill('white');
            text('EASY', this.CANVAS_WIDTH/2 + 50, this.BELOW_TITLE + 2*this.VERT_SP);
        }else{
            rect(this.CANVAS_WIDTH/2 + 300, this.BELOW_TITLE + 2*this.VERT_SP + this.REG_TEXT/2, 100, this.REG_TEXT + 25);
            fill('white');
            text('HARD', this.CANVAS_WIDTH/2 + 300, this.BELOW_TITLE + 2*this.VERT_SP);
        }
    }

    keyListening(){
        if(keyCode === UP_ARROW && this.selector > this.ON_MODE){
            this.selector--;
        }else if(keyCode === DOWN_ARROW && this.selector < this.ON_START){
            this.selector++;
        }else if(keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW){
            if(this.selector === this.ON_MODE){
                this.twoPlayerMode = !this.twoPlayerMode;
            }else if(this.selector === this.ON_P1DIFF){
                this.player1difficulty = 1 - this.player1difficulty;
            }else if(this.selector === this.ON_P2DIFF){
                this.player2difficulty = 1 - this.player2difficulty;
            }
        }
    }

}