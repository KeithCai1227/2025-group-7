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

        //create the buttons for player mode
        this.button1Player = createButton('1 Player');
        this.button2Player = createButton('2 Players');

        //create buttons for difficulty levels
        this.buttonPl1Easy = createButton('Easy');
        this.buttonPl2Easy = createButton('Easy');
        this.buttonPl1Hard = createButton('Hard');
        this.buttonPl2Hard = createButton('Hard');

        //button sizes
        this.button1Player.size(150, 50);
        this.button2Player.size(150, 50);
        this.buttonPl1Easy.size(100, 50);
        this.buttonPl2Easy.size(100, 50);
        this.buttonPl1Hard.size(100, 50);
        this.buttonPl2Hard.size(100, 50);

        //button positions
        this.button1Player.position(25, 25);
        this.button2Player.position(25, 200);
        this.buttonPl1Easy.position(25, 450);
        this.buttonPl2Easy.position(200, 450);
        this.buttonPl1Hard.position(500, 450);
        this.buttonPl2Hard.position(675, 450);
    }

    draw(){
        background(200, 200, 200);

        //display the game title
        textFont('Courier New');
        textStyle(BOLD);
        textSize(this.HEADING_SIZE);
        textAlign(CENTER, TOP);
        text('Tank Trouble', this.CANVAS_WIDTH/2, 25);

        //put in mode selection
        textSize(this.REGULAR_TEXT_SIZE);
        text('Select player mode:', this.CANVAS_WIDTH/2, 175);

        //put in difficulty selection
        text('Select difficulty levels:', this.CANVAS_WIDTH/2, 425);
    }
}