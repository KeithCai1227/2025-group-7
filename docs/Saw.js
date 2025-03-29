
let offset;

class Saw {

    constructor(tankSprite){
        this.damage = 1;
        this.sawOffset = 18;
        this.collisionOffset = 9;
        this.scaleFactor = 0.6;
        this.isStriking = false;

        this.tankSprite = tankSprite;
        this.sawSprite = new Sprite();
        //load in image of saw
        this.sawSprite.img = "https://i.imgur.com/Xx0mUwN.png";
        this.sawSprite.img.scale = 0.1;

        //set initial location
        this.setSpriteLocation(this.sawSprite, this.sawOffset);

        //create sprite that acts as collider
        this.collisionSprite = new Sprite();
        this.collisionSprite.diameter = this.sawSprite.height * this.scaleFactor;
        this.collisionSprite.opacity = 0;
        this.collisionSprite.overlaps(this.tankSprite);
        this.setSpriteLocation(this.collisionSprite, this.collisionOffset);

        //attach sprites to tank
        this.glueJoint1 = new GlueJoint(this.collisionSprite, this.tankSprite);
        this.sawSprite.overlaps(allSprites);

        this.glueJoint2 = new GlueJoint(this.sawSprite, this.tankSprite);

        this.sawSprite.mass = 0;
        this.tankSprite.mass = 0;
        this.collisionSprite.mass = 0;
    }

    setSpriteLocation(sprite, offset){
        //calculate appropriate initial location based on location/rotation of tank
        if(this.tankSprite.rotation === 90 || this.tankSprite.rotation === 180 || this.tankSprite.rotation === -90 || this.tankSprite.rotation === -180){
            sprite.rotation = this.tankSprite.rotation + 180 * cos(this.tankSprite.rotation);
            sprite.position.x = this.tankSprite.position.x + offset * sin(this.tankSprite.rotation);
            sprite.position.y = this.tankSprite.position.y + offset * cos(this.tankSprite.rotation);

        }

        if(this.tankSprite.rotation > 90 && this.tankSprite.rotation < 180 || this.tankSprite.rotation >= 0 && this.tankSprite.rotation < 90){
            sprite.rotation = this.tankSprite.rotation + 180;
            sprite.position.x = this.tankSprite.position.x - offset * sin(this.tankSprite.rotation);
            sprite.position.y = this.tankSprite.position.y + offset * cos(this.tankSprite.rotation);
        }

        if(this.tankSprite.rotation < -90 && this.tankSprite.rotation > -180 || this.tankSprite.rotation < 0 && this.tankSprite.rotation > -90){
            sprite.rotation = this.tankSprite.rotation; 
            sprite.position.x = this.tankSprite.position.x + offset * sin(this.tankSprite.rotation);
            sprite.position.y = this.tankSprite.position.y - offset * cos(this.tankSprite.rotation);

        }

    }

    strike(){
        //increase saw size to show impact
        this.isStriking = true
        this.sawSprite.img.scale = 0.15;

        //wait before reverting
        setTimeout(() => {
        this.sawSprite.img.scale = 0.1;
        this.isStriking = false;
        }, 50);
    }

    draw(){
        this.sawSprite.draw();
        this.collisionSprite.draw();
    }
    

    update(){
        //keep gluejoint sturdy
        this.sawSprite.velocity.x = this.tankSprite.velocity.x;
        this.sawSprite.velocity.y = this.tankSprite.velocity.y;
        this.collisionSprite.velocity.x = this.tankSprite.velocity.x;
        this.collisionSprite.velocity.y = this.tankSprite.velocity.y;
        
    }


}