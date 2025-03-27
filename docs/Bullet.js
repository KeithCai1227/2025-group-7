class Bullet extends Projectile {

    //lifespan of bullet in seconds
    static LIFESPAN = 10;

    constructor(x, y, angle) {
        super(x, y, angle, Bullet.LIFESPAN);
        this.sprite = new Sprite();
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.duration = Bullet.LIFESPAN;
        this.sprite.diameter = 10;
        this.sprite.color = color(0, 0, 0);
        this.sprite.direction = angle;
        this.sprite.speed = 4;
        this.sprite.bounciness = 1;
        this.sprite.friction = 0;
        this.sprite.autoUpdate = false;
        this.sprite.autoDraw = false;
    }
    
    draw(){
        this.sprite.draw();
    }
  
    update(){
        this.sprite.update();

        //after half the life of bullet, shrink the bullet
        if(this.despawnTime - millis() < 0.5*1000*Bullet.LIFESPAN){
            this.sprite.diameter -= 0.025;
        }
    }

    remove(){
        this.sprite.remove();
    }
}
