class Tank{

    tankWeapon; //which particular type of weapon the tank has
    tankLife; //remaining life of the tank
    tankSprite; //sprite created with P5 Play
    TANK_HEIGHT = 30;
    TANK_WIDTH = 20;
    GUN_HEIGHT = 6;
    GUN_WIDTH = 8;
    PROJECTILE_SPAWN_DIST = 5;
    UP_DIRECTION = 0;
    DOWN_DIRECTION = 1;
    LEFT_DIRECTION = 2;
    RIGHT_DIRECTION = 3;
    NO_DIRECTION = 4;
    
    //note the image, rotation and speed will be attributes of the sprite

    //locX and locY are the initial co-ordinates
    //initialDirection is the initial direction the tank is pointing in
    //initialWeapon is the weapon the tank has to begin with
    constructor(locX, locY, initialDirection, initialWeapon){
        this.locX = locX;
        this.locY = locY;
        //AT THE MOMENT THE INITIAL DIRECTION IS VERTICAL
        //this.initialDirection = initialDirection;
        this.initialWeapon = initialWeapon;
        //create a sprite in P5 Play for the tank
        this.tankSprite = new Sprite();
        this.tankSprite.x = locX;
        this.tankSprite.y = locY;
        this.tankSprite.width = this.TANK_HEIGHT;
        this.tankSprite.height = this.TANK_WIDTH;
        this.tankSprite.addCollider((this.GUN_HEIGHT + this.TANK_HEIGHT)/2, 0, this.GUN_HEIGHT, this.GUN_WIDTH);
        this.tankSprite.autoUpdate = false;
        this.tankSprite.autoDraw = false;
        this.tankSprite.rotationLock = true;
        this.tankSprite.speed = 0;
        this.tankSprite.rotation = 0;
    }
    
    draw(){
        //call the draw method of the underlying sprite
        this.tankSprite.draw();
    }
    
    fire(){
        //Create new projectile according to appropriate weapon type
        if(this.weaponType.numberOfRounds < this.weaponType.capacity){
            let projDist = this.TANK_HEIGHT/2 + this.GUN_HEIGHT + this.PROJECTILE_SPAWN_DIST;
            let projX = projDist*Math.cos(this.tankSprite.rotation);
            let projY = projDist*Math.sin(this.tankSprite.rotation);
            
            if(this.tankWeapon.weaponType == this.tankWeapon.BULLET_TYPE){
                this.weaponType.numberOfRounds++;
                return new Bullet(projX, projY, this.tankSprite.rotation);
            }
            else if(this.tankWeapon.weaponType == this.tankWeapon.LASER_TYPE){
                this.weaponType.numberOfRounds++;
                return new Laser(projX, projY, this.tankSprite.rotation);  
            }
        }
    }
    
    //animates tank destruction
    destroy(){
        //AT THE MOMENT NO ANIMATION IS DISPLAYED
    }
    
    update(){
        //call the update method of the underlying sprite
        this.tankSprite.update();
    }
    
    //updates the rotation and speed attributes of the tank sprite
    //directionOfMove corresponds to either UP, DOWN, LEFT or RIGHT
    move(directionOfMove){
        if(directionOfMove == this.RIGHT_DIRECTION){
            if (this.tankSprite.speed === 0) this.tankSprite.rotation += 1;
            else this.tankSprite.rotation +=2;
        }
        if(directionOfMove == this.LEFT_DIRECTION){
            if (this.tankSprite.speed === 0) this.tankSprite.rotation -= 1;
            else this.tankSprite.rotation -=2;
        }
        if(directionOfMove == this.UP_DIRECTION){
            this.tankSprite.direction = this.tankSprite.rotation;
            this.tankSprite.speed = 1;
        }
        else if(directionOfMove == this.DOWN_DIRECTION){
            this.tankSprite.direction = this.tankSprite.rotation;
            this.tankSprite.speed = -0.5;
        }
        else {
            this.tankSprite.speed = 0;
        }
    }
}
