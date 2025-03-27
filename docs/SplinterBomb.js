class SplinterBomb extends Projectile{
    static BOMB_SIZE = 2;
    static NU_SPLINTERS = 10;

    constructor(x, y, angle){
        super(x, y, angle, Weapon.BOMB_TIME);
        this.sprite = new Sprite(x, y, SplinterBomb.BOMB_SIZE, 'octagon');
        this.sprite.duration = Weapon.BOMB_TIME;
        this.sprite.color = color(0, 0, 0);
        this.sprite.direction = angle;
        this.sprite.speed = 4;
        this.sprite.bounciness = 1;
        this.sprite.friction = 0;
        this.sprite.autoUpdate = false;
        this.sprite.autoDraw = false;
    }

    draw(){
        this.sprite.draw();
    }
  
    update(){
        this.sprite.update();
    }

    remove(){
        this.sprite.remove();
        this.splinter();
    }

    splinter(){
        let splinters = [];
        let x = this.sprite.x;
        let y = this.sprite.y;
        for(let i = 0; i < SplinterBomb.NU_SPLINTERS; i++){
            let splinter = new Splinter(x, y, 0);
            splinters[i] = splinter;
        }
        
        //add splinters to projectile list from GameState
        GameState.projectileList = GameState.projectileList.concat(splinters);
    }
}