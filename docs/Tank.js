class Tank{

    tankWeapon; //which particular type of weapon the tank has
    tankLife; //remaining life of the tank
    tankSprite; //sprite created with P5 Play
    static TANK_HEIGHT = 30;
    static TANK_WIDTH = 20;
    static GUN_HEIGHT = 6;
    static GUN_WIDTH = 8;
    static PROJECTILE_SPAWN_DIST = 10;
    static UP_DIRECTION = 0;
    static DOWN_DIRECTION = 1;
    static LEFT_DIRECTION = 2;
    static RIGHT_DIRECTION = 3;
    static NO_DIRECTION = 4;
    
    //note the image, rotation and speed will be attributes of the sprite

    //locX and locY are the initial co-ordinates
    //initialDirection is the initial direction the tank is pointing in
    //initialDirection should be in degrees measured clockwise from x-axis
    constructor(locX, locY, initialDirection){
        //AT THE MOMENT THE INITIAL DIRECTION IS VERTICAL
        //this.initialDirection = initialDirection;
        this.tankWeapon = new Weapon(Weapon.BULLET_TYPE);
        //create a sprite in P5 Play for the tank
        this.tankSprite = new Sprite();
        this.tankSprite.x = locX;
        this.tankSprite.y = locY;
        this.tankSprite.width = Tank.TANK_HEIGHT;
        this.tankSprite.height = Tank.TANK_WIDTH;
        this.tankSprite.addCollider((Tank.GUN_HEIGHT + Tank.TANK_HEIGHT)/2, 0, Tank.GUN_HEIGHT, Tank.GUN_WIDTH);
        this.tankSprite.autoUpdate = false;
        this.tankSprite.autoDraw = false;
        this.tankSprite.rotationLock = true;
        this.tankSprite.speed = 0;
        this.tankSprite.rotation = initialDirection;
        this.tankSprite.color = color(150, 150, 150);
    }
    
    draw(){
        //call the draw method of the underlying sprite
        this.tankSprite.draw();
    }
    
    fire(){
        //Create new projectile according to appropriate weapon type
        if(this.tankWeapon.numberOfRounds < this.tankWeapon.capacity){
            let projDist = Tank.TANK_HEIGHT/2 + Tank.GUN_HEIGHT + Tank.PROJECTILE_SPAWN_DIST;
            let projX = this.tankSprite.x + projDist*cos(this.tankSprite.rotation);
            let projY = this.tankSprite.y + projDist*sin(this.tankSprite.rotation);
            
            if(this.tankWeapon.weaponType == Weapon.BULLET_TYPE){
                this.tankWeapon.numberOfRounds++;
                return new Bullet(projX, projY, this.tankSprite.rotation, 10);
            }
            else if(this.tankWeapon.weaponType == Weapon.LASER_TYPE){
                this.tankWeapon.numberOfRounds++;
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
        if(directionOfMove == Tank.RIGHT_DIRECTION){
            if (this.tankSprite.speed === 0) this.tankSprite.rotation += 1;
            else this.tankSprite.rotation +=2;
        }
        if(directionOfMove == Tank.LEFT_DIRECTION){
            if (this.tankSprite.speed === 0) this.tankSprite.rotation -= 1;
            else this.tankSprite.rotation -=2;
        }
        if(directionOfMove == Tank.UP_DIRECTION){
            this.tankSprite.direction = this.tankSprite.rotation;
            this.tankSprite.speed = 1;
        }
        else if(directionOfMove == Tank.DOWN_DIRECTION){
            this.tankSprite.direction = this.tankSprite.rotation;
            this.tankSprite.speed = -0.5;
        }
        else {
            this.tankSprite.speed = 0;
        }
    }
}
