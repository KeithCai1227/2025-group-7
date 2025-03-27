class SplinterBomb extends Projectile{
    static BOMB_SIZE = 2;
    static NU_SPLINTERS = 10;

    constructor(x, y, angle){
        super(x, y, angle, Weapon.SPLINTER_DURATION);
        this.bombSprite = new Sprite(x, y, SplinterBomb.BOMB_SIZE, 'octagon');
        this.bombSprite.duration = Weapon.SPLINTER_DURATION;
        this.bombSprite.x = x;
        this.bombSprite.y = y;
        this.bombSprite.color = color(0, 0, 0);
        this.bombSprite.direction = angle;
        this.bombSprite.speed = 4;
        this.bombSprite.bounciness = 1;
        this.bombSprite.friction = 0;
        this.bombSprite.autoUpdate = false;
        this.bombSprite.autoDraw = false;

        //create an empty list for the splinters
        this.splinters = [];

        //boolean to determine whether splinter has happened
        this.splitered = false;

        this.isSplinter = true;
    }

    draw(){
        if(!this.splitered){
            this.bombSprite.draw();
        }
        else{
            for(let splinter of this.splinters){
                splinter.draw();
            }
        }
    }
  
    update(){
        if(!this.splitered){
            this.bombSprite.update();
        }
        else{
            for(let splinter of this.splinters){
                splinter.update();
            }
        }

        //after half the life of splinter, explode the bomb
        if(this.despawnTime - millis() < 0.5*1000*Weapon.SPLINTER_DURATION){
            this.splinter();
        }
    }

    //removes all splinter sprites
    remove(){
        for(let i = this.splinters.length; i >= 0; i--){
            this.splinters[i].remove();
        }
    }

    splinter(){
        let direction, velocity, size;
        let x = this.bombSprite.x;
        let y = this.bombSprite.y;
        for(let i = 0; i < SplinterBomb.NU_SPLINTERS; i++){
            let splinter = new Sprite(x, y);
            splinter.color = color(0, 0, 0);
            splinter.direction = Math.random()*360;
            splinter.velocity = Math.random()*5;
            splinter.diameter = Math.random()*4 + 1;
            splinter.bounciness = 1;
            splinter.friction = 0;
            splinter.autoUpdate = false;
            splinter.autoDraw = false;
            this.splinters[i] = splinter;
        }

        //signify splintering has occurred
        this.splitered = true;

        //remove the old bomb sprite
        this.bombSprite.remove();
    }
}