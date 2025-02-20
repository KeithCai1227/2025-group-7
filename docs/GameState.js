class GameState{
    projectileList;
    tankList;
    collectibleList;
    mapTiles;
    keyListener;
    CANVAS_WIDTH = 960;
    CANVAS_HEIGHT = 480;
    
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
        
        //generate map - code needs updating once exact map functions written
        this.mapTiles = new Group();
        
        //UNCOMMENT THIS ONCE THE FUNCTION HAS BEEN WRITTEN
        //setMap();
        
        //TEMPORARY BOUNDARY - DELETED ONCE MAP FUNCTIONS WRITTEN
        let mapBoundary = new Sprite(this.CANVAS_WIDTH/2, this.CANVAS_HEIGHT/2, this.CANVAS_WIDTH - 50, this.CANVAS_HEIGHT - 50, 'static');
	    mapBoundary.shape = 'chain';
        
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
        
        //draw tiles
        for(let tileCnt = 0; tileCnt < this.mapTiles.length; tileCnt++){
            this.mapTiles[tileCnt].draw();
        }
        
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
        //update tiles
        for(let tileCnt = 0; tileCnt < this.mapTiles.length; tileCnt++){
            this.mapTiles[tileCnt].update();
        }
        
        //update tanks
        for(let tankCnt = 0; tankCnt < this.tankList.length; tankCnt++){
            this.tankList[tankCnt].update();
        }
        
        //update projectiles
        for(let projCnt = 0; projCnt < this.projectileList.length; projCnt++){
            this.projectileList[projCnt].update();
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
    
    //for now - empty
    checkProjectileTankOverlaps(){
    }
    
    //for now - empty
    checkProjectileWallOverlaps(){
    }

}
