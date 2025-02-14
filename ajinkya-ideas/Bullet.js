class Bullet {

    incX;
    incY; 
    bulletSprite;

    //travelDirection is the angle of bullet travel in radians measured
    //anticlockwise from horizontal
    constructor(locX, locY, radius, travelDirection, travelSpeed) {
        this.incX = travelSpeed*Math.cos(travelDirection);
        this.incY = - travelSpeed*Math.sin(travelDirection);

        this.bulletSprite = new Sprite();
        this.bulletSprite.x = locX;
        this.bulletSprite.y = locY;
        this.bulletSprite.diameter = 2*radius;
        this.bulletSprite.color = color(0, 0, 0);
        this.bulletSprite.bounciness = 1;
        this.bulletSprite.autoUpdate = false;
        this.bulletSprite.autoDraw = false;
        this.bulletSprite.vel.x = this.incX;
        this.bulletSprite.vel.y = this.incY;
        this.bulletSprite.mass = 0;
        this.bulletSprite.friction = 0;
    }

    drawBullet() {
       this.bulletSprite.draw();
    }

    updateLocation() {
        this.bulletSprite.update();
    }
}