class Tank{

    tankWeapon; //which particular type of weapon the tank has
    tankSprite; //sprite created with P5 Play
    saw;
    static TANK_HEIGHT = 20;
    static TANK_WIDTH = 20;
    static GUN_HEIGHT = 20;
    static GUN_WIDTH = 10;
    static WHEEL_HEIGHT = 12;
    static WHEEL_WIDTH = 20;
    static PROJECTILE_SPAWN_DIST = 10;
    static UP_DIRECTION = 0;
    static DOWN_DIRECTION = 1;
    static LEFT_DIRECTION = 2;
    static RIGHT_DIRECTION = 3;
    static NO_DIRECTION = 4;
    
    //locX and locY are the initial co-ordinates
    //initialDirection is the initial direction the tank is pointing in
    //initialDirection should be in degrees measured clockwise from x-axis
    constructor(locX, locY, initialDirection, difficultyLevel, index){
        this.tankWeapon =  new Weapon(Weapon.BULLET_TYPE);

        //create a sprite in P5 Play for the tank
        //this.tankSprite = new Sprite();
        //this.tankSprite.x = locX;
        this.INITIALX = locX;
        //this.tankSprite.y = locY;
        this.INITIALY = locY;
        //this.tankSprite.width = Tank.TANK_HEIGHT;
        //this.tankSprite.height = Tank.TANK_WIDTH;
        this.tankSprite = new Sprite(locX, locY, Tank.TANK_WIDTH, "hexagon");

        this.tankSprite.addCollider((Tank.GUN_HEIGHT + Tank.TANK_HEIGHT)/2, 0, Tank.GUN_HEIGHT, Tank.GUN_WIDTH);
        // add wheels as colliders
        this.tankSprite.wheels = new Group();
        this.tankSprite.wheels.color = 'gray';
        this.tankSprite.wheels.autoDraw = false;
        this.tankSprite.wheels.autoUpdate = false;
        new this.tankSprite.wheels.Sprite(this.tankSprite.x, this.tankSprite.y + (Tank.WHEEL_HEIGHT + Tank.TANK_HEIGHT)/2, Tank.WHEEL_WIDTH, Tank.WHEEL_HEIGHT);
        new this.tankSprite.wheels.Sprite(this.tankSprite.x, this.tankSprite.y - (Tank.WHEEL_HEIGHT + Tank.TANK_HEIGHT)/2, Tank.WHEEL_WIDTH, Tank.WHEEL_HEIGHT);

        new GlueJoint(this.tankSprite, this.tankSprite.wheels[0]);
        new GlueJoint(this.tankSprite, this.tankSprite.wheels[1]);
        //this.tankSprite.addCollider(0, Tank.TANK_HEIGHT/2, Tank.WHEEL_WIDTH, Tank.WHEEL_HEIGHT);
        //this.tankSprite.addCollider(0, -Tank.TANK_HEIGHT/2, Tank.WHEEL_WIDTH, Tank.WHEEL_HEIGHT);
        this.tankSprite.autoUpdate = false;
        this.tankSprite.autoDraw = false;
        this.tankSprite.rotationLock = true;
        this.tankSprite.speed = 0;
        this.tankSprite.rotation = initialDirection;
        this.INITIALROTATION = initialDirection;
        if(this.index === 1){
            this.tankSprite.color = color(240, 0, 0);
        } else this.tankSprite.color = color(0, 240, 0);

        //set the tank's speed and life based on the difficulty level
        if(difficultyLevel == GameState.EASY){
            this.initialLife = 3;
            this.tankLife = 3;
        } else if(difficultyLevel == GameState.HARD){
            this.initialLife = 1;
            this.tankLife = 1;
        }
        this.spdFactor = 3;
    }
    
    draw(){
        //call the draw method of the underlying sprite

        

        drawingContext.shadowBlur = 15;
        drawingContext.shadowColor = this.tankSprite.wheels.color;

        this.tankSprite.wheels.draw();
        
        drawingContext.shadowBlur = 0;
        drawingContext.shadowColor = 'transparent';

        drawingContext.shadowBlur = 10;
        drawingContext.shadowColor = this.tankSprite.color;

        this.tankSprite.draw();
        
        drawingContext.shadowBlur = 0;
        drawingContext.shadowColor = 'transparent';
        
        
        if(this.tankWeapon.weaponType == Weapon.SAW_TYPE){
            this.saw.draw();
        }
    }
    canFire(){
        return (this.tankWeapon.numberOfRounds < this.tankWeapon.capacity);
    }

    fire(){
        //Create new projectile according to appropriate weapon type
        let weaponSize = (this.tankWeapon.weaponType == Weapon.BULLET_TYPE ? Bullet.BULLET_SIZE : this.tankWeapon.weaponType == Weapon.BOMB_TYPE? SplinterBomb.BOMB_SIZE: 0);
        let projDist = Tank.TANK_HEIGHT/2 + Tank.GUN_HEIGHT + Tank.PROJECTILE_SPAWN_DIST + weaponSize/2;
        let projX = this.tankSprite.x + projDist*cos(this.tankSprite.rotation);
        let projY = this.tankSprite.y + projDist*sin(this.tankSprite.rotation);

        if(this.tankWeapon.weaponType == Weapon.BULLET_TYPE){
            this.tankWeapon.numberOfRounds++;
            return new Bullet(projX, projY, this.tankSprite.rotation);
        }
        else if(this.tankWeapon.weaponType == Weapon.LASER_TYPE){
            this.tankWeapon.numberOfRounds++;
            this.checkWeaponReset();
            return new Laser(projX, projY, this.tankSprite.rotation);
        }
        else if(this.tankWeapon.weaponType == Weapon.BOMB_TYPE){
            this.tankWeapon.numberOfRounds++;
            this.checkWeaponReset();
            return new SplinterBomb(projX, projY, this.tankSprite.rotation);
        }
    }

    checkWeaponReset(){
        //if you have used up all of a special weapon, reset to bullet with half capacity
        if(!this.canFire() && !(this.tankWeapon.weaponType == Weapon.BULLET_TYPE)){
            this.tankWeapon = new Weapon(Weapon.BULLET_TYPE);
            this.tankWeapon.capacity = Math.round(0.5*Weapon.BULLET_CAPACITY);
        }
    }

    lifeDecrement(){
        if(this.tankLife > 0)
            this.tankLife--;
    }

    lifeDecrease(damage){
        if(this.tankLife - damage > 0){
            this.tankLife -= damage;
        }else{
            this.tankLife = 0;
        }
    }

    lifeIncrement(){
        if (this.tankLife < this.initialLife){
            this.tankLife++;
        }

        if (this.tankLife > this.initialLife){
            this.tankLife = this.initialLife;
        }
    }

    // life refresh when game restarts
    lifeRefresh(){
        this.tankLife = this.initialLife;
    }

    getLife(){
        return this.tankLife;
    }

    getAmmo(){
        return this.tankWeapon.getAmmo();
    }

    numberOfRoundsRefresh(){
        this.tankWeapon.numberOfRounds = 0;
    }

    //refresh positions when game restarts
    positionRefresh(){
        this.tankSprite.x = this.INITIALX;
        this.tankSprite.y = this.INITIALY;
        this.tankSprite.rotation = this.INITIALROTATION;
        this.tankSprite.wheels[0].x = this.tankSprite.x;
        this.tankSprite.wheels[0].y = this.tankSprite.y + Tank.TANK_HEIGHT/2;
        this.tankSprite.wheels[1].x = this.tankSprite.x;
        this.tankSprite.wheels[1].y = this.tankSprite.y - Tank.TANK_HEIGHT/2;
    }

    //animates tank destruction
    destroy(){
        //AT THE MOMENT NO ANIMATION IS DISPLAYED
    }
    
    update(){
        //call the update method of the underlying sprite

        this.tankSprite.wheels.update();
        this.tankSprite.update();
        if(this.tankWeapon.weaponType == Weapon.SAW_TYPE){
            this.saw.update();
        }
    }
    
    //updates the rotation and speed attributes of the tank sprite
    //directionOfMove corresponds to either UP, DOWN, LEFT or RIGHT
    move(directionOfMove){
        if(directionOfMove == Tank.RIGHT_DIRECTION){
            if (this.tankSprite.speed === 0) this.tankSprite.rotation += 1*this.spdFactor;
            else this.tankSprite.rotation += 2*this.spdFactor;
        }
        if(directionOfMove == Tank.LEFT_DIRECTION){
            if (this.tankSprite.speed === 0) this.tankSprite.rotation -= 1*this.spdFactor;
            else this.tankSprite.rotation -= 2*this.spdFactor;
        }
        if(directionOfMove == Tank.UP_DIRECTION){
            this.tankSprite.direction = this.tankSprite.rotation;
            this.tankSprite.speed = 1*this.spdFactor;
        }
        else if(directionOfMove == Tank.DOWN_DIRECTION){
            this.tankSprite.direction = this.tankSprite.rotation;
            this.tankSprite.speed = -0.5*this.spdFactor;
        }
        else {
            this.tankSprite.speed = 0;
        }
    }
}
