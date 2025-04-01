class Pickup {

    constructor(gridWidth, gridHeight){
        // currently draws 10 x 10 box with a block colour, but this can be
        // replaced with a bespoke image once we have weapons system fleshed out
        this.sprite = new Sprite();
        let columns = 960/80;
        let rows = 480/80;
        this.sprite.x = floor(random(1, columns)) * 80 - 40;
        this.sprite.y = floor(random(1, rows)) * 80 - 40;
        this.sprite.width = 10;
        this.sprite.height = 10;
        this.sprite.collider = "static";
        this.sprite.autoUpdate = false;
        this.sprite.autoDraw = false;
        
        // selects pick-up by using millis as a pseudo-random number
        let randomiser = Math.floor(Math.random() * 100) % 4;
            
        if(randomiser == 0){
            this.type = "HEALTH";
            this.sprite.color = color(200, 0, 0);
        }else if(randomiser == 1){
            // refresh ammo
            this.type = "AMMO";
            this.sprite.color = color(0, 0, 200);  
        }else if(randomiser == 2){
            //saw weapon pickup
            //this.type = "SAW"
            //this.sprite.color = color(0, 200, 0);
            this.type = "AMMO";
            this.sprite.color = color(0, 0, 200);  
        }
        else{
            // bomb weapon pickup
            this.type = "BOMB";
            this.sprite.color = color(0, 0, 0);
        }
            
    }

    draw(){
        this.sprite.draw();
    }

    update(){
        this.sprite.update();
    }
}
