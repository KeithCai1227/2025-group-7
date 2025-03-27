class Splinter extends Projectile{
    constructor(x, y, angle){
        super(x, y, angle, Weapon.SPLINTER_TIME);
        this.sprite = new Sprite();
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.color = color(0, 0, 0);
        this.sprite.direction = Math.random()*360;
        this.sprite.speed = Math.random()*5;
        this.sprite.diameter = Math.random()*4 + 1;
        this.sprite.duration = Weapon.SPLINTER_TIME;
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
    }

    remove(){
        this.sprite.remove();
    }
}