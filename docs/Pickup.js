class Pickup {

    constructor(gridWidth, gridHeight){
        let cellX = floor(random(0, 9));
        let cellY = floor(random(0, 3));

        // currently draws 10 x 10 box with a block colour, but this can be
        // replaced with a bespoke image once we have weapons system fleshed out
        this.sprite = new Sprite();
        this.sprite.x = cellX * 90.5 + 62;
        this.sprite.y = cellY * 105 + 54 + (cellX % 2 == 0 ? 0 : 52.5);
        this.sprite.width = 30;
        this.sprite.height = 30;
        this.sprite.collider = "static";
        this.sprite.autoUpdate = false;
        this.sprite.autoDraw = false;
        this.sprite.overlaps(allSprites);
        // selects pick-up by using millis as a pseudo-random number
        let randomiser = Math.floor(Math.random() * 100) % 5;
        
        if(randomiser == 0){
            this.type = "HEALTH";
            this.sprite.image = 'images/health-pickup.webp';
            this.sprite.image.scale = 0.1;
        }else if(randomiser == 1){
            // refresh ammo
            this.type = "AMMO";
            this.sprite.image = 'images/ammo-pickup.webp';
            this.sprite.image.scale = 0.1;
        }else if(randomiser == 2){
            //saw weapon pickup
            this.type = "SAW"
            this.sprite.color = color(0, 200, 0);
        }
        else if(randomiser == 3){
            // laser weapon pickup
            this.type = "LASER";
            this.sprite.image = 'images/laser-pickup.webp';
            this.sprite.image.scale = 0.1;
        }
        else{
            // bomb weapon pickup
            this.type = "BOMB";
            this.sprite.image = 'images/bomb-pickup.webp';
            this.sprite.image.scale = 0.1;
        }
        
    }

    draw(){
        this.sprite.draw();
    }

    update(){
        this.sprite.update();
    }
}
