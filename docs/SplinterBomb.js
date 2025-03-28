class SplinterBomb extends Projectile{
    static BOMB_SIZE = 10;
    static NU_SPLINTERS = 40;

    constructor(x, y, angle){
        super(x, y, angle, Weapon.BOMB_TIME);
        this.sprite = new Sprite(x, y, SplinterBomb.BOMB_SIZE, 'pentagon');
        this.sprite.duration = Weapon.BOMB_TIME;
        this.sprite.color = color(0, 0, 0);
        this.sprite.direction = angle;
        this.sprite.speed = 4;
        this.sprite.rotationSpeed = 25;
        this.sprite.bounciness = 1;
        this.sprite.friction = 0;
        this.sprite.autoUpdate = false;
        this.sprite.autoDraw = false;

        //bomb has no damage - but its splinters do
        this.damage = 0;
    }

    draw(){
        this.sprite.draw();
    }
  
    update(){
        this.sprite.update();
    }

    remove(){
        this.splinter();
        this.sprite.remove();
    }

    splinter(){
        let splinters = [];
        let x = this.sprite.x;
        let y = this.sprite.y;
        
        for(let i = 0; i < SplinterBomb.NU_SPLINTERS; i++){
            GameState.projectileList.push(new Splinter(x, y, 0));
        }
    }
}