

class GameState{
    projectileList;
    tankList;
    collectibleList;
    keyListener;
    CANVAS_WIDTH = 960;
    CANVAS_HEIGHT = 480;
    gameMap;
    TANK1X = 200;
    TANK1Y = 200;
    TANK2X = 300;
    TANK2Y = 300;
    TANK1ROT = 90;
    TANK2ROT = 90;
    
    constructor(){
        //create canvas
        createCanvas(this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
        
        //create empty lists for projectiles and collectibles
        this.projectileList = [];
        this.collectibleList = [];
        
        //generate map
        displayMode('centered');
        this.gameMap = new Grid();
        this.gameMap.initGrid();
        this.gameMap.initMap();
        
        //create two tanks
        this.tankList = [];
        let tank1 = new Tank(this.TANK1X, this.TANK1Y, this.TANK1ROT);
        this.tankList.push(tank1);
        let tank2 = new Tank(this.TANK2X, this.TANK2Y, this.TANK2ROT);
        this.tankList.push(tank2);
        
        //create new KeyListener object
        this.keyListener = new KeyListener(this.tankList);
    }
    
    draw(){
        background(200, 200, 200);
        
        //draw the map
         this.gameMap.draw();
        //draw tanks
        for(let tankCnt = 0; tankCnt < this.tankList.length; tankCnt++){
            this.tankList[tankCnt].draw();
        }
        
        //draw projectiles
        for(let projCnt = 0; projCnt < this.projectileList.length; projCnt++){
            this.projectileList[projCnt].draw();
        } 
        
        //draw collectibles
        for(let collCnt = 0; collCnt < this.collectibleList.length; collCnt++){
            this.collectibleList[collCnt].draw();
        }
        
    }
    
    update(){
        //update map
        this.gameMap.update();
        //update tanks
        for(let tankCnt = 0; tankCnt < this.tankList.length; tankCnt++){
            this.tankList[tankCnt].update();
        }
        
        //update projectiles
        for(let projCnt = 0; projCnt < this.projectileList.length; ){
            if (this.projectileList[projCnt].despawnTime < millis()) {
                this.projectileList[projCnt].bulletSprite.remove();
                this.projectileList.splice(projCnt, 1);
            }
            else {
                this.projectileList[projCnt].update();
                projCnt++;
            }
        } 
        
        //update collectibles
        for(let collCnt = 0; collCnt < this.collectibleList.length; collCnt++){
            this.collectibleList[collCnt].update();
        }
    
        //update tank movement based on user key presses
        this.keyListener.listenForKeys();
        
        //collision checks
        this.checkProjectileTankOverlaps();
        this.checkProjectileWallOverlaps();
        
    }
    
    addProjectile(newProjectile){
        this.projectileList.push(newProjectile);
    }
    
    checkProjectileTankOverlaps(){
        for (let i = 0; i < this.tankList.length; i++) {
            for (let j = 0; j < this.projectileList.length; ) {
                if (this.projectileList[j].bulletSprite.collides(this.tankList[i].tankSprite)) {
                    this.tankList[i].hit();
                    this.projectileList[j].bulletSprite.remove();
                    this.projectileList.splice(j, 1);
                    //implement tankLife initialisation and decrementer in Tank class
                    //this.tankList[j].hit();
                } else j++;
            }
        }
    }
    
    //for now - empty
    checkProjectileWallOverlaps(){
    }

}
