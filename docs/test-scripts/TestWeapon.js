function testWeapon(){
    //create bullet weapon for test purposes
    let testWeapon = new Weapon(Weapon.BULLET_TYPE);
    //check correct capacity
    console.assert(testWeapon.capacity == Weapon.BULLET_CAPACITY, "Weapon Class: Failed bullet capacity check.");
    
    //create laser weapon for test purposes
    testWeapon = new Weapon(Weapon.LASER_TYPE);
    //check correct capacity
    console.assert(testWeapon.capacity == Weapon.LASER_CAPACITY, "Weapon Class: Failed laser capacity check.");
}

