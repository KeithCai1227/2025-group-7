class Tank {

    locX;
    locY;
    travelDirection;
    travelSpeed;
    rotationSpeed;
    firePoint;
    tankSprite;

    TANK_WIDTH = 22;
    TANK_HT = 30;
    TURRET_RAD = 20;
    GUN_LENGTH = 18;
    GUN_WIDTH = 7;
    NU_POLY_PTS = 6;
    FIRE_PT_POSN = 2;

    //travelDirection is the angle of tank in degrees measured
    //anticlockwise from horizontal
    constructor(locX, locY, travelDirection, travelSpeed, rotationSpeed) {
        this.locX = locX;
        this.locY = locY;
        this.travelSpeed = travelSpeed;
        this.rotationSpeed = rotationSpeed;
        //convert travelDirection to radians
        this.travelDirection = (Math.PI/180)*travelDirection;

        //create a point from which bullets fired by tank will spwan
        this.firePoint = createVector(0, 0);
        this.updateFirePoint();

        //create a sprite for the tank collision physics
        this.tankSprite = this.createTankSprite();
    }

    drawTank() {
        angleMode(RADIANS);
        this.tankSprite.draw();
    }

    updatePosition() {
        //rotate tank 
        if (keyIsDown(LEFT_ARROW)) {
            this.tankSprite.rotation -= this.rotationSpeed*(Math.PI/180);
        } else if (keyIsDown(RIGHT_ARROW)) {
            this.tankSprite.rotation += this.rotationSpeed*(Math.PI/180);
        } 
        
        //move tank forwards and backwards
        if (keyIsDown(UP_ARROW)) {
            this.tankSprite.x += this.travelSpeed*Math.sin(this.tankSprite.rotation);
            this.tankSprite.y -= this.travelSpeed*Math.cos(this.tankSprite.rotation);
        } else if (keyIsDown(DOWN_ARROW)){
            this.tankSprite.x -= this.travelSpeed*Math.sin(this.tankSprite.rotation);
            this.tankSprite.y += this.travelSpeed*Math.cos(this.tankSprite.rotation);
        }

        this.locX = this.tankSprite.x;
        this.locY = this.tankSprite.y;
        this.travelDirection = -this.tankSprite.rotation + (Math.PI/2);
        this.tankSprite.update();
    }

    createTankSprite(){
        //define vectors for tank x-axis and y-axis
        let tankYDir = createVector(Math.cos(this.travelDirection), - Math.sin(this.travelDirection));
        let tankXDir = createVector(Math.cos(this.travelDirection - Math.PI/2), - Math.sin(this.travelDirection - Math.PI/2));

        //vector for tank center
        let tankOrigin = createVector(this.locX, this.locY);

        //create an array of vector points for the tank polygon
        //set all tank points to the center
        let pts = [];
        for(let count = 0; count < 8; count++){
            pts[count] = createVector(0, 0);
            pts[count].set(tankOrigin);
        }

        //calculate four tank corner points
        pts[0].add(tankXDir.copy().mult(this.TANK_WIDTH/2));
        pts[0].add(tankYDir.copy().mult(this.TANK_HT/2));
        pts[1].add(tankXDir.copy().mult(this.TANK_WIDTH/2));
        pts[1].sub(tankYDir.copy().mult(this.TANK_HT/2));
        pts[2].sub(tankXDir.copy().mult(this.TANK_WIDTH/2));
        pts[2].sub(tankYDir.copy().mult(this.TANK_HT/2));
        pts[3].sub(tankXDir.copy().mult(this.TANK_WIDTH/2));
        pts[3].add(tankYDir.copy().mult(this.TANK_HT/2));

        //calculate gun extension points
        pts[4].sub(tankXDir.copy().mult(this.GUN_WIDTH/2));
        pts[4].add(tankYDir.copy().mult(this.TANK_HT/2));
        pts[5].sub(tankXDir.copy().mult(this.GUN_WIDTH/2));
        pts[5].add(tankYDir.copy().mult((this.GUN_LENGTH + this.TURRET_RAD)/2));
        pts[6].add(tankXDir.copy().mult(this.GUN_WIDTH/2));
        pts[6].add(tankYDir.copy().mult((this.GUN_LENGTH + this.TURRET_RAD)/2));
        pts[7].add(tankXDir.copy().mult(this.GUN_WIDTH/2));
        pts[7].add(tankYDir.copy().mult(this.TANK_HT/2));

        let newTank = new Sprite([
            [pts[0].x, pts[0].y],
            [pts[1].x, pts[1].y],
            [pts[2].x, pts[2].y],
            [pts[3].x, pts[3].y],
            [pts[0].x, pts[0].y]
        ]);

        newTank.addCollider(0, 0, [
            [pts[4].x, pts[4].y],
            [pts[5].x, pts[5].y],
            [pts[6].x, pts[6].y],
            [pts[7].x, pts[7].y],
            [pts[4].x, pts[4].y]
        ]);
        newTank.color = color(255, 0, 0);
        newTank.bounciness = 0;
        newTank.autoUpdate = false;
        newTank.autoDraw = false;
        return newTank;
    }

    updateFirePoint() {
        //define vector for tank y-axis
        let tankYDir = createVector(Math.cos(this.travelDirection), - Math.sin(this.travelDirection));

        //vector for tank center
        let tankOrigin = createVector(this.locX, this.locY);

        //set firePoint a number of pixels in front of tank
        //defined by the FIRE_PT_POSN variable
        this.firePoint.set(tankOrigin);
        let frontOfTank = (this.GUN_LENGTH + this.TURRET_RAD)/2;
        this.firePoint = this.firePoint.add(tankYDir.copy().mult(frontOfTank + this.FIRE_PT_POSN));
    }
}