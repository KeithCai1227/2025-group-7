class Tank{

    tankWeapon; //which particular type of weapon the tank has
    bullets; //how many bullets the tank has left available
    tankLife; //remaining life of the tank
    
    //note the image, rotation and speed will be attributes of the sprite

    //locX and locY are the initial co-ordinates
    //initialDirection is the initial direction the tank is pointing in
    //initialWeapon is the weapon the tank has to begin with
    constructor(locX, locY, initialDirection, initialWeapon){
        //create a sprite in P5 Play for the tank
    }
    
    draw(){
        //call the draw method of the underlying sprite
    }
    
    fire(){
    }
    
    destroy(){
    }
    
    update(){
        //call the update method of the underlying sprite
    }
    
    //updates the rotation and speed attributes of the tank sprite
    //directionOfMove corresponds to either UP, DOWN, LEFT or RIGHT
    move(directionOfMove){
    }
}
