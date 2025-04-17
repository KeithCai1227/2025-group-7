class Pickup {

    constructor(gridWidth, gridHeight, pickups, tanks){
        
        let cells = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]

        for (let i = 0; i < pickups.length; i++){
            cells[pickups[i].y][pickups[i].x] = 1;
        }

        for (let i = 0; i < tanks.length; i++){
            let tankCell = tanks[i].getCurrentCell();
            cells[tankCell[0]][tankCell[1]] = 1;
        }

        let spawnCell = floor(random(0, 39 - pickups.length - 2));
        let cellCount = 0;
        let cellX, cellY;
        let cellFound = false;
        for (let j = 0; j < 4 && cellFound == false; j++){
            for (let i = 0; i < 10 && cellFound == false; i++){
                if (cellCount == spawnCell && cells[j][i] == 0){
                    cellFound = true;
                    cellX = i;
                    cellY = j;
                    break;
                }
                if (cells[j][i] == 0){
                    cellCount++;
                }
            }
        }

        this.sprite = new Sprite();
        this.sprite.x = cellX * 90.5 + 62;
        this.sprite.y = cellY * 105 + 54 + (cellX % 2 == 0 ? 0 : 52.5);
        this.sprite.width = 30;
        this.sprite.height = 30;
        this.sprite.collider = "static";
        this.sprite.autoUpdate = false;
        this.sprite.autoDraw = false;
        this.sprite.overlaps(allSprites);

        // store cell co-ordinates for look-up by later constructors
        this.x = cellX;
        this.y = cellY;

        // selects pick-up by using millis as a pseudo-random number
        let randomiser = Math.floor(Math.random() * 100) % 5;
        
        if(randomiser == 0){
            this.type = "HEALTH";
            this.sprite.image = 'images/health-pickup.webp';
        }else if(randomiser == 1){
            // refresh ammo
            this.type = "AMMO";
            this.sprite.image = 'images/ammo-pickup.webp';
        }else if(randomiser == 2){
            //saw weapon pickup
            this.type = "SAW"
            this.sprite.image = 'images/saw-pickup.webp';
        }
        else if(randomiser == 3){
            // laser weapon pickup
            this.type = "LASER";
            this.sprite.image = 'images/laser-pickup.webp';
        }
        /*else if (randomiser == 4) {
            this.type = "SHIELD"; 
            this.sprite.color = color(0, 200, 255); */
        else{
            // bomb weapon pickup
            this.type = "BOMB";
            this.sprite.image = 'images/bomb-pickup.webp';
        }
        this.sprite.image.scale = 0.1;
    }

    draw(){
        this.sprite.draw();
    }

    update(){
        this.sprite.update();
    }
}
