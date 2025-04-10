class Pickup {

    constructor(gridWidth, gridHeight){
        let cellX = floor(random(0, 9));
        let cellY = floor(random(0, 3));

        // currently draws 10 x 10 box with a block colour, but this can be
        // replaced with a bespoke image once we have weapons system fleshed out
        this.sprite = new Sprite();
        this.sprite.x = cellX * 90.5 + 62;
        this.sprite.y = cellY * 105 + 54 + (cellX % 2 == 0 ? 0 : 52.5);
        this.sprite.width = 10;
        this.sprite.height = 10;
        this.sprite.collider = "static";
        this.sprite.autoUpdate = false;
        this.sprite.autoDraw = false;
        this.sprite.overlaps(allSprites);
        // selects pick-up by using millis as a pseudo-random number
        let randomiser = Math.floor(Math.random() * 100) % 5;
        
        if(randomiser == 0){
            this.type = "HEALTH";
            this.sprite.color = color(200, 0, 0);
        }else if(randomiser == 1){
            // refresh ammo
            this.type = "AMMO";
            this.sprite.color = color(0, 0, 200);  
        }else if(randomiser == 2){
            //saw weapon pickup
            this.type = "SAW"
            this.sprite.color = color(0, 200, 0);
        }
        else if(randomiser == 3){
            // laser weapon pickup
            this.type = "LASER";
            this.sprite.color = color(255, 255, 0);
        }
        else{
            // bomb weapon pickup
            this.type = "BOMB";
            this.sprite.color = color(255, 255, 255);
        }
            
            
    }

    draw(){

        drawingContext.shadowBlur = 15;
        if(this.sprite.color != color(0, 0, 0)){
        drawingContext.shadowColor = this.sprite.color;
        } else{
            drawingContext.shadowColor = color(255, 255, 255);
        }
        
            
        
        this.sprite.draw();
        drawingContext.shadowBlur = 0;
        drawingContext.shadowColor = 'transparent';

        
    }

    update(){
        this.sprite.update();
    }
}
