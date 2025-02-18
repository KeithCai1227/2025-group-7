class Weapon{
    numberOfRounds; //Number of projectiles which have been fired so far
    capacity; //Total number of projectiles which can be fired
    weaponType; //Takes different values depending upon weapon type
    BULLET_TYPE = 0;
    LASER_TYPE = 1;
    
    constructor(weaponType){
        if(weaponType == this.BULLET_TYPE){
            this.weaponType = weaponType;
            this.capacity = 20;
            this.numberOfRounds = 0;
        }
        else if(weaponType == this.LASER_TYPE){
            this.weaponType = weaponType;
            this.capacity = 1;
            this.numberOfRounds = 0;
        }
    }
    
}
