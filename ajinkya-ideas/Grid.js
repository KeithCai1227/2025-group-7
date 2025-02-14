class Grid{

    numRows;
    numCols;
    gridVertWalls;
    gridHorzWalls;
    gridCellSize;
    wallWidth;
    canvasOffsetX;
    canvasOffsetY;
    activeBullets;
    tanks;

    BULLET_SIZE = 3;
    BULLET_SPEED = 4;
    TANK_TRAVEL_SPD = 5;
    TANK_ROT_SPD = 5;

    constructor(numRows, numCols, gridCellSize, canvasOffsetX, canvasOffsetY){
        this.numRows = numRows;
        this.numCols = numCols;
        this.canvasOffsetX = canvasOffsetX;
        this.canvasOffsetY = canvasOffsetY;
        this.gridCellSize = gridCellSize;
        this.wallWidth = Math.ceil(gridCellSize/10); //wall width is grid cell width divided by 10
        this.wallWidth = 2*Math.ceil(this.wallWidth/2); //make wall width an even number
        this.activeBullets = []; //make activeBullets a list with no elements for now
        this.tanks = [];

        //create 2D arrays representing horizontal and vertical walls
        //set all walls to 0 meaning non-existent
        this.gridVertWalls = [];
        this.gridHorzWalls = [];

        for (let rowCount = 0; rowCount < this.numRows; rowCount++) {
            this.gridVertWalls[rowCount] = [];
            for (let colCount = 0; colCount <= this.numCols; colCount++) {
                this.gridVertWalls[rowCount][colCount] = 0;
            }
        }

        for (let rowCount = 0; rowCount <= this.numRows; rowCount++) {
            this.gridHorzWalls[rowCount] = [];
            for (let colCount = 0; colCount < this.numCols; colCount++) {
                this.gridHorzWalls[rowCount][colCount] = 0;
            }
        }

        this.generateMap();
        //create tank (note - the placement is currently fixed)
        this.tanks[0] = new Tank(150, 100, 90, 
            this.TANK_TRAVEL_SPD, this.TANK_ROT_SPD);
    }

    generateMap(){
        
        //at the moment, this only generates a manual map for a 6-by-10 grid
        if (this.numRows == 6 && this.numCols == 10) {
            this.gridVertWalls = [
                [1,1,0,0,0,0,0,1,0,0,1],
                [1,1,0,1,0,0,0,0,0,0,1],
                [1,0,0,1,0,0,1,0,0,1,1],
                [1,0,0,1,0,0,1,0,0,1,1],
                [1,1,0,1,0,0,0,0,0,1,1],
                [1,1,0,0,0,0,0,0,0,1,1]
            ];
            this.gridHorzWalls = [
                [1,1,1,1,1,1,1,1,1,1],
                [0,0,0,1,1,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,1,1,1,0,1,1,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [1,1,1,1,1,1,1,1,1,1]
            ];

            //instantiate the sprites for the vertical walls
            for (let rowCount = 0; rowCount < this.numRows; rowCount++) {
                for (let colCount = 0; colCount <= this.numCols; colCount++) {
                    if (this.gridVertWalls[rowCount][colCount] == 1){
                        let sprX = this.canvasOffsetX + colCount*this.gridCellSize;
                        let sprY = this.canvasOffsetY + (rowCount + 0.5)*this.gridCellSize;
                        this.gridVertWalls[rowCount][colCount] = new Sprite(sprX, sprY, this.wallWidth, this.gridCellSize + this.wallWidth, 'static');
                        this.gridVertWalls[rowCount][colCount].color = color(0, 0, 0);
                        this.gridVertWalls[rowCount][colCount].autoDraw = false;
                        this.gridVertWalls[rowCount][colCount].autoUpdate = false;
                    }
                }
            }

            //instantiate the sprites for the horizontal walls
            for (let rowCount = 0; rowCount <= this.numRows; rowCount++) {
                for (let colCount = 0; colCount < this.numCols; colCount++) {
                    if (this.gridHorzWalls[rowCount][colCount] == 1){
                        let sprX = this.canvasOffsetX + (colCount + 0.5)*this.gridCellSize;
                        let sprY = this.canvasOffsetY + rowCount*this.gridCellSize;
                        this.gridHorzWalls[rowCount][colCount] = new Sprite(sprX, sprY, this.gridCellSize + this.wallWidth, this.wallWidth, 'static');
                        this.gridHorzWalls[rowCount][colCount].color = color(0, 0, 0);
                        this.gridHorzWalls[rowCount][colCount].autoDraw = false;
                        this.gridHorzWalls[rowCount][colCount].autoUpdate = false;
                    }
                }
            }
        }
        
    }

    drawMap(){
        //draw the background of the grid
        fill(255, 255, 255);
        strokeWeight(0);
        rect(this.canvasOffsetX, this.canvasOffsetY, this.numCols*this.gridCellSize, this.numRows*this.gridCellSize);
        
        for (let rowCount = 0; rowCount < this.numRows; rowCount++) {
            for (let colCount = 0; colCount <= this.numCols; colCount++) {
                if (this.gridVertWalls[rowCount][colCount] != 0){
                    this.gridVertWalls[rowCount][colCount].draw();
                }
            }
        }

        for (let rowCount = 0; rowCount <= this.numRows; rowCount++) {
            for (let colCount = 0; colCount < this.numCols; colCount++) {
                if (this.gridHorzWalls[rowCount][colCount] != 0){
                    this.gridHorzWalls[rowCount][colCount].draw();
                }
            }
        }
        
        for (let count = 0; count < this.activeBullets.length; count++) {
            this.activeBullets[count].drawBullet();
        }
        for (let count = 0; count < this.tanks.length; count++){
            this.tanks[count].drawTank();
        }
    }

    updateState() {
        for (let count = 0; count < this.activeBullets.length; count++) {
            this.activeBullets[count].updateLocation();
        }

        for (let count = 0; count < this.tanks.length; count++){
            this.tanks[count].updatePosition();
            this.tanks[count].updateFirePoint();
        }
    }

    //creates new bullet and fires from tank
    fireBullet(tank) {
        let newBullet = new Bullet(tank.firePoint.x, tank.firePoint.y, 
            this.BULLET_SIZE, tank.travelDirection, this.BULLET_SPEED);
        this.activeBullets.push(newBullet);
    }
}