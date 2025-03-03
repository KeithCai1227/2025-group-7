class GameSetup{
    
    //the canvas parameters duplicates of those from GameState
    //ideally single source of truth
    CANVAS_WIDTH = 960;
    GRID_HEIGHT = 480;

    HEADING_SIZE = 75;
    REGULAR_TEXT_SIZE = 25;

    twoPlayerMode;
    player1difficulty;
    player2difficulty;

    constructor(){
        //initial game settings
        this.twoPlayerMode = true;
        this.player1difficulty = GameState.EASY;
        this.player1difficulty = GameState.EASY;

    }

    draw(){
        background(200, 200, 200);

        //display the game title
        textFont('Courier New');
        fill('black');
        textStyle(BOLD);
        textSize(this.HEADING_SIZE);
        textAlign(CENTER, TOP);
        text('Tank Trouble', this.CANVAS_WIDTH/2, 25);

        //put in user selection box
        rectMode(CENTER);
        fill('black');
        rect(this.CANVAS_WIDTH/2 + 175, 225 + this.REGULAR_TEXT_SIZE/2, 500, 100);
        fill(200, 200, 200);
        strokeWeight(0);
        rect(this.CANVAS_WIDTH/2 + 175, 225 + this.REGULAR_TEXT_SIZE/2, 490, 90);
        rect(this.CANVAS_WIDTH/2 + 175, 225 + this.REGULAR_TEXT_SIZE/2, 500, 50);
        rect(this.CANVAS_WIDTH/2 + 175, 225 + this.REGULAR_TEXT_SIZE/2, 400, 100);

        //put in mode selection
        fill('black');
        textSize(this.REGULAR_TEXT_SIZE);
        textAlign(RIGHT, TOP);
        text('NUMBER OF PLAYERS:', this.CANVAS_WIDTH/2 - 100, 225);

        //put in difficulty selection
        text('PLAYER 1 DIFFICULTY:', this.CANVAS_WIDTH/2 - 100, 350);
        text('PLAYER 2 DIFFICULTY:', this.CANVAS_WIDTH/2 - 100, 475);

        //put in player mode boxes
        textAlign(CENTER, TOP);
        //rect(this.CANVAS_WIDTH/2 - 50, 225, 200, this.REGULAR_TEXT_SIZE);
        text('ONE PLAYER', this.CANVAS_WIDTH/2 + 50, 225);
        text('TWO PLAYER', this.CANVAS_WIDTH/2 + 300, 225);

        //put in difficulty boxes
        text('EASY', this.CANVAS_WIDTH/2 + 50, 350);
        text('EASY', this.CANVAS_WIDTH/2 + 50, 475);
        text('HARD', this.CANVAS_WIDTH/2 + 300, 350);
        text('HARD', this.CANVAS_WIDTH/2 + 300, 475);

        //put in "start game"
        text('START GAME', this.CANVAS_WIDTH/2 + 175, 600);

        //highlight player mode selection
        fill('black');
        if(this.twoPlayerMode){
            rect(this.CANVAS_WIDTH/2 + 50, 225 + this.REGULAR_TEXT_SIZE/2, 200, this.REGULAR_TEXT_SIZE + 25);
            fill('white');
            text('ONE PLAYER', this.CANVAS_WIDTH/2 + 50, 225);
        }else{
            rect(this.CANVAS_WIDTH/2 + 300, 225 + this.REGULAR_TEXT_SIZE/2, 200, this.REGULAR_TEXT_SIZE + 25);
            fill('white');
            text('TWO PLAYER', this.CANVAS_WIDTH/2 + 300, 225);
        }

        //highlight difficulty selection for player 1
        fill('black');
        if(this.player1difficulty == GameState.EASY){
            rect(this.CANVAS_WIDTH/2 + 50, 350 + this.REGULAR_TEXT_SIZE/2, 100, this.REGULAR_TEXT_SIZE + 25);
            fill('white');
            text('EASY', this.CANVAS_WIDTH/2 + 50, 350);
        }else{
            rect(this.CANVAS_WIDTH/2 + 300, 350 + this.REGULAR_TEXT_SIZE/2, 100, this.REGULAR_TEXT_SIZE + 25);
            fill('white');
            text('HARD', this.CANVAS_WIDTH/2 + 300, 350);
        }

        //highlight difficulty selection for player 2
        fill('black');
        if(!this.player1difficulty == GameState.EASY){
            rect(this.CANVAS_WIDTH/2 + 50, 475 + this.REGULAR_TEXT_SIZE/2, 100, this.REGULAR_TEXT_SIZE + 25);
            fill('white');
            text('EASY', this.CANVAS_WIDTH/2 + 50, 475);
        }else{
            rect(this.CANVAS_WIDTH/2 + 300, 475 + this.REGULAR_TEXT_SIZE/2, 100, this.REGULAR_TEXT_SIZE + 25);
            fill('white');
            text('HARD', this.CANVAS_WIDTH/2 + 300, 475);
        }
    }
}