
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
        this.sawSprite.img = "./Xx0mUwN_d.png";
        this.sawSprite.img.scale = 0.03;
        this.sawSprite.img.height = this.sawSprite.img.height * 0.03;
        this.sawSprite.img.width = this.sawSprite.img.width * 0.03;
        //this.sawSprite.rotationLock = true;

        //set initial location

        //create sprite that acts as collider
        this.collisionSprite = new Sprite();
        this.collisionSprite.diameter = this.sawSprite.height * this.scaleFactor;
        this.collisionSprite.opacity = 0;
        this.collisionSprite.overlaps(this.tankSprite);
        this.setSpriteLocation(this.collisionSprite, this.collisionOffset);

        //attach sprites to tank
        this.glueJoint1 = new GlueJoint(this.collisionSprite, this.tankSprite);
        this.sawSprite.overlaps(allSprites); 

       
        this.setSpriteLocation(this.sawSprite, this.sawOffset);
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
        this.sawSprite.img.scale = 0.04;
        //wait before reverting
        setTimeout(() => {
        this.sawSprite.img.scale = 0.03;
        this.isStriking = false;
        }, 50);
    }

    draw(){
    
        
        drawingContext.shadowBlur = 15;
        drawingContext.shadowColor = 'white';
        
        this.sawSprite.draw();
        this.collisionSprite.draw();
        drawingContext.shadowBlur = 0;
        drawingContext.shadowColor = 'transparent';

        
    }
    

    update(){
        //keep gluejoint sturdy
        this.sawSprite.velocity.x = this.tankSprite.velocity.x;
        this.sawSprite.velocity.y = this.tankSprite.velocity.y;
        this.collisionSprite.velocity.x = this.tankSprite.velocity.x;
        this.collisionSprite.velocity.y = this.collisionSprite.velocity.y;
       
    }


}
