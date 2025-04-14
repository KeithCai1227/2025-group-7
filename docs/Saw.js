
let offset;
let sawWidth = 50;
let sawHeight = 50;

class Saw {

    constructor(tankSprite , tankIndex){
        this.damage = Infinity;
        this.tankIndex = tankIndex;
        this.tankSprite = tankSprite;
        this.sawOffset = 25;
        this.collisionOffset = 30;
        this.sawSprite = new Sprite(); 
        this.sawSprite.img = "./spikedram.png";

        //this.sawSprite.width = 35;
        //this.sawSprite.height = 10;
        this.sawSprite.img.scale = 0.1;
        this.sawSprite.overlaps(allSprites);
        this.sawSprite.rotation = this.tankSprite.rotation + 90;

        this.collisionSprite = new Sprite();
        this.collisionSprite.height = 10;
        this.collisionSprite.width = 35;


        this.setSpriteLocation(this.sawSprite, this.sawOffset);

        this.collisionSprite.rotation = this.tankSprite.rotation + 90;
        this.setSpriteLocation(this.collisionSprite, this.collisionOffset);
        this.collisionSprite.opacity = 0;

        this.glueJoint = new GlueJoint(this.sawSprite, this.tankSprite);
        this.glueJoint1 = new GlueJoint(this.collisionSprite, this.tankSprite);
        this.sawSprite.mass = this.tankSprite.mass;
        this.collisionSprite.mass = this.tankSprite.mass;

        this.collisionSprite.rotationLock = true;

    }

    setSpriteLocation(sprite, offset){
        //calculate appropriate initial location based on location/rotation of tank
        if(this.tankSprite.rotation === 90 || this.tankSprite.rotation === -90){
            sprite.position.x = this.tankSprite.position.x - offset * cos(this.tankSprite.rotation);
            sprite.position.y = this.tankSprite.position.y + offset * sin(this.tankSprite.rotation);

        }

        if(this.tankSprite.rotation === 180 || this.tankSprite.rotation === -180){
            sprite.position.x = this.tankSprite.position.x + offset * cos(this.tankSprite.rotation);
            sprite.position.y = this.tankSprite.position.y - offset * sin(this.tankSprite.rotation);
        }

        else{
            sprite.position.x = this.tankSprite.position.x + offset * cos(this.tankSprite.rotation);
            sprite.position.y = this.tankSprite.position.y + offset * sin(this.tankSprite.rotation);
        }
    }


    draw(){
        drawingContext.shadowBlur = 15;
        drawingContext.shadowColor = 'white';
        
        this.sawSprite.draw();
        drawingContext.shadowBlur = 0;
        drawingContext.shadowColor = 'transparent';
        
    }
    

    update(){
        //keep gluejoint sturdy
        this.sawSprite.velocity.x = this.tankSprite.velocity.x;
        this.sawSprite.velocity.y = this.tankSprite.velocity.y;
        this.collisionSprite.rotation = this.sawSprite.rotation;

        this.sawSprite.width = sawWidth;
        this.sawSprite.height = sawHeight;


    }

    remove(){
        this.glueJoint.remove();
        this.sawSprite.remove();
        this.glueJoint1.remove();
        this.collisionSprite.remove();
    }


}
