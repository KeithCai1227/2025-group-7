class Weapon{
    numberOfRounds; //Number of projectiles which have been fired so far
    capacity; //Total number of projectiles which can be fired
    weaponType; //Takes different values depending upon weapon type

    //enumeration of weapon types
    static BULLET_TYPE = 0;
    static LASER_TYPE = 1;
    static BOMB_TYPE = 2;
    static SAW_TYPE = 3;

    //capacity of weapon types
    static BULLET_CAPACITY = 10;
    static LASER_CAPACITY = 1;
    static BOMB_CAPACITY = 1;

    //time before weapon expires
    static BULLET_TIME = 10;
    static LASER_TIME = 8; 
    static BOMB_TIME = 5;
    static SPLINTER_TIME = 2;
    
    constructor(weaponType){
        if(weaponType == Weapon.BULLET_TYPE){
            this.weaponType = weaponType;
            this.capacity = Weapon.BULLET_CAPACITY;
            this.numberOfRounds = 0;
        }
        else if(weaponType == Weapon.LASER_TYPE){
            this.weaponType = weaponType;
            this.capacity = Weapon.LASER_CAPACITY;
            this.numberOfRounds = 0;
        }
        else if(weaponType == Weapon.BOMB_TYPE){
            this.weaponType = weaponType;
            this.capacity = Weapon.BOMB_CAPACITY;
            this.numberOfRounds = 0;
        }
        else if(weaponType == Weapon.SAW_TYPE){
            this.weaponType = weaponType;
            this.capacity = null;
            this.numberOfRounds = null;
        }
    }

    getAmmo() {
        return this.capacity - this.numberOfRounds;
    }

    resetAmmo() {
        this.numberOfRounds = 0;
    }
    
}
