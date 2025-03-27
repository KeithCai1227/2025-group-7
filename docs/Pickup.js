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
        // constructs either a health or weapon pick-up by using millis as a pseudo-random number
        if(Math.floor(Math.random() * 100) % 2 == 0) {
            this.type = "HEALTH";
            this.sprite.color = color(200, 0, 0);
        } else {
            // once we have more weapons ready to deploy, this can be split out to a sub-function that randomises for weapon
            this.type = "BULLET";
            this.sprite.color = color(0, 0, 200);
        }
    }

    draw(){
        this.sprite.draw();
    }

    update(){
        this.sprite.update();
    }
}