class Bullet extends Projectile {
   constructor(x, y, angle,lifespown ) {
     this.bulletSprite= new Sprite();
     this.bulllteSprite.x = x;
     this.bulllteSprite.y= y;
     this.bulllteSprite.duration = lifespown;
     this.bulletSprite.diameter = 10;
     this.bulletSprite.color = color(0, 0, 0);
     this.bulletSprite.rotation = angle;
     this.bulletSprite.speed = 4;
  }
  draw(){
    this.bulletSprite.draw();
  }
  update() {
   this.bulletSprite.update();
  }
}
