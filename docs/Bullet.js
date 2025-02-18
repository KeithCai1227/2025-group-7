class Bullet extends Projectile {

    constructor(x, y, angle, lifespan) {
        super(x, y, angle, 10);
        this.bulletSprite = new Sprite();
        this.bulletSprite.x = x;
        this.bulletSprite.y = y;
        this.bulletSprite.duration = lifespan;
        this.bulletSprite.diameter = 10;
        this.bulletSprite.color = color(0, 0, 0);
        this.bulletSprite.direction = angle;
        this.bulletSprite.speed = 4;
        this.bulletSprite.bounciness = 1;
        this.bulletSprite.friction = 0;
    }
    
    draw(){
        this.bulletSprite.draw();
    }
  
    update() {
        this.bulletSprite.update();
    }
}
