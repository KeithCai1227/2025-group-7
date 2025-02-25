

class GameState{
    projectileList;
    tankList;
    collectibleList;
    keyListener;
    isGameOver;
    CANVAS_WIDTH = 960;
    GRID_HEIGHT = 480;
    LOWER_PANEL_HT = 200;
    CANVAS_HEIGHT = this.GRID_HEIGHT + this.LOWER_PANEL_HT;
    gameMap;
    RAND1X = floor(random(9, 11)); 
    RAND1Y = floor(random(1, 5)); 
    RAND2X = floor(random(1, 4));
    RAND2Y = floor(random(1, 5));
    TANK1X = this.RAND1X*80-40;
    TANK1Y = this.RAND1Y*80-40;
    TANK2X = this.RAND2X*80-40;
    TANK2Y = this.RAND2Y*80-40;
    ANGLE1 = atan2(this.TANK2Y - this.TANK1Y, this.TANK2X - this.TANK1X);
    ANGLE2 = atan2(this.TANK1Y - this.TANK2Y, this.TANK1X - this.TANK2X);
    TANK1ROT = this.ANGLE1;
    TANK2ROT = this.ANGLE2;
    player1Score;
    player2Score;
    
    constructor(){ 
        this.isGameOver = false;

        //create canvas
        createCanvas(this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
        
        //create empty lists for projectiles and collectibles
        this.projectileList = [];
        this.collectibleList = [];
        
        //generate map
        displayMode('centered');
        this.gameMap = new Grid(this.GRID_HEIGHT);
        this.gameMap.initGrid();
        this.gameMap.initMap();
        
        //create two tanks
        this.tankList = [];
        let tank1 = new Tank(this.TANK1X, this.TANK1Y, this.TANK1ROT);
        console.log(this.TANK1X, this.TANK1Y, this.TANK1ROT);
        this.tankList.push(tank1);
        let tank2 = new Tank(this.TANK2X, this.TANK2Y, this.TANK2ROT);
        this.tankList.push(tank2);

        //set scores to zero
        this.player1Score = this.player2Score = 0;
        
        //create new KeyListener object
        this.keyListener = new KeyListener(this.tankList);
    }
    
    draw(){
        background(200, 200, 200);
        
        //draw the map
         this.gameMap.draw();
         
        //draw tanks
        for(let i = 0; i < this.tankList.length; i++){
                this.tankList[i].draw();
        }
        
        //draw projectiles
        for(let i = 0; i < this.projectileList.length; i++){
            this.projectileList[i].draw();
        } 
        
        //draw collectibles
        for(let i = 0; i < this.collectibleList.length; i++){
            this.collectibleList[i].draw();
        }

        //draw scores of players
        this.drawScores();
    }
    
    update(){
        //update map
        this.gameMap.update();
        
        //update tanks
        for(let i = 0; i < this.tankList.length; i++){
            this.tankList[i].update();
        }
        
        //update projectiles
        for(let i = 0; i < this.projectileList.length; ){
            if (this.projectileList[i].despawnTime < millis()) {
                this.projectileList[i].bulletSprite.remove();
                this.projectileList.splice(i, 1);
            }
            else {
                this.projectileList[i].update();
                i++;
            }
        } 
        
        //update collectibles
        for(let i = 0; i < this.collectibleList.length; i++){
            this.collectibleList[i].update();
        }
    
        //update tank movement based on user key presses
        this.keyListener.listenForKeys();
        
        //collision checks
        this.checkProjectileTankOverlaps();
        this.checkProjectileWallOverlaps();

        //restart game if tank life is 0
        for(let i = 0; i < this.tankList.length; i++){
            if(this.tankList[i].getLife() === 0){
                this.isGameOver = true;

                //update the relevant score
                i == 0 ? this.player2Score++ : this.player1Score++;

                this.restartGame();
                for(let j = 0; j < this.tankList.length; j++){
                    this.tankList[j].lifeRefresh();
                }
            }
        }

    }
    
    addProjectile(newProjectile){
        this.projectileList.push(newProjectile);
    }

    getIsGameOver(){
        return this.isGameOver;
    }
    
    //restart game when tank dies
    restartGame(){
    // wait 2 seconds before restart
        setTimeout (() => {
            //only refresh map once
            if(this.isGameOver){
                walls.remove();
                this.gameMap = new Grid(this.GRID_HEIGHT);
                this.gameMap.initGrid();
                this.gameMap.initMap();
            }
            for(let i = 0; i < this.tankList.length; i++){
                //complete destroy method in tank class
                //change position refresh when tank spawn implemented
                //for now back to original positions
                this.tankList[i].positionRefresh();
                this.tankList[i].numberOfRoundsRefresh();
            }
             //get rid of all current projectiles
            for(let j = 0; j < this.projectileList.length; j++){
                this.projectileList[j].bulletSprite.remove();
            }
            this.isGameOver = false;
        }, 2000);
      
    }
    
    checkProjectileTankOverlaps(){
        for (let i = 0; i < this.tankList.length; i++) {
            for (let j = 0; j < this.projectileList.length; ) {
                if (this.projectileList[j].bulletSprite.collides(this.tankList[i].tankSprite)) {
                    this.tankList[i].hit();
                    this.projectileList[j].bulletSprite.remove();
                    this.projectileList.splice(j, 1);
                    this.tankList[i].lifeDecrement();
                    //this.tankList[j].hit();
                } else j++;
            }
        }
    }
    
    //for now - empty
    checkProjectileWallOverlaps(){
    }

    drawScores(){
        //obtain strings for scores
        let scoreString1 = "Player 1 Score : ";
        let scoreString2 = "Player 2 Score : ";
        scoreString1 = scoreString1.concat(this.player1Score.toString());
        scoreString2 = scoreString2.concat(this.player2Score.toString());

        //display scores below the grid
        let xMargin = 25;
        let yMargin = 25;
        textFont('Courier New');
        textStyle(BOLD);
        textSize(this.LOWER_PANEL_HT/4 - yMargin);
        textAlign(RIGHT, TOP);
        text(scoreString1, this.CANVAS_WIDTH - xMargin, this.GRID_HEIGHT + yMargin);
        textAlign(LEFT, TOP);
        text(scoreString2, xMargin, this.GRID_HEIGHT + yMargin);
    }
}
