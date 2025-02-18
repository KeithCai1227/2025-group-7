function testTank(){
    //create tank for tests
    let testTank = new Tank(100, 200, 90, new Weapon(Weapon.BULLET_TYPE));

    //check initial values are correct
    console.assert(testTank.tankSprite.x == 100, "Tank Class: Failed x-location check.");
    console.assert(testTank.tankSprite.y == 200, "Tank Class: Failed y-location check.");
    console.assert(testTank.tankSprite.rotation == 90, "Tank Class: Failed rotation check.");
    console.assert(testTank.tankSprite.speed == 0, "Tank Class: Failed speed check.");

    //check right rotation works properly
    testTank.move(testTank.RIGHT_DIRECTION);
    console.assert(Math.round(testTank.tankSprite.rotation) == 91, "Tank Class: Failed rotation check.");
    for(count = 0; count < 9; count++){
        testTank.move(testTank.RIGHT_DIRECTION);
    }
    console.assert(Math.round(testTank.tankSprite.rotation) == 100, "Tank Class: Failed rotation check.");

    //check left rotation works properly
    testTank.tankSprite.rotation = 90;
    testTank.move(testTank.LEFT_DIRECTION);
    console.assert(Math.round(testTank.tankSprite.rotation) == 89, "Tank Class: Failed rotation check.");
    for(count = 0; count < 9; count++){
        testTank.move(testTank.LEFT_DIRECTION);
    }
    console.assert(Math.round(testTank.tankSprite.rotation) == 80, "Tank Class: Failed rotation check.");

    //check forwards and backwards movement works properly
    testTank.tankSprite.rotation = 90;
    testTank.move(testTank.UP_DIRECTION);
    console.assert(testTank.tankSprite.speed == 1, "Tank Class: Failed speed check.");
    testTank.move(testTank.DOWN_DIRECTION);
    console.assert(testTank.tankSprite.speed == 0.5, "Tank Class: Failed speed check.");
    testTank.move(testTank.NO_DIRECTION);
    console.assert(testTank.tankSprite.speed == 0, "Tank Class: Failed speed check.");

    //check movement and rotation work together as intended
    testTank.move(testTank.UP_DIRECTION);
    testTank.move(testTank.RIGHT_DIRECTION);
    console.assert(Math.round(testTank.tankSprite.rotation) == 92, "Tank Class: Failed rotation check.");
    testTank.move(testTank.RIGHT_DIRECTION);
    console.assert(Math.round(testTank.tankSprite.rotation) == 93, "Tank Class: Failed rotation check.");
}