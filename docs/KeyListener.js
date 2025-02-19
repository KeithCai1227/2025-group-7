let D_CODE = 68;
let A_CODE = 65;
let S_CODE = 83;
let W_CODE = 87;

class KeyListener {
   
   constructor (tanks) {
     this.tanks = tanks;
     tank1 = this.tanks[0];
     tank2 = this.tanks[1];
   }

   listenForKeys () { 

     if(keyIsDown(RIGHT_ARROW)){
       tank1.move(Tank.RIGHT_DIRECTION);
     }

     if(keyIsDown(LEFT_ARROW)){
       tank1.move(Tank.LEFT_DIRECTION);
     }

     if(keyIsDown(DOWN_ARROW)){
       tank1.move(Tank.DOWN_DIRECTION);
     }

     else if(keyIsDown(UP_ARROW)){
       tank1.move(Tank.UP_DIRECTION);
     }

     else {
       tank1.move(Tank.NO_DIRECTION);
     }
     
     if(keyIsDown(D_CODE)){ 
       tank2.move(Tank.RIGHT_DIRECTION);
     }
     
     if(keyIsDown(A_CODE)){  
       tank2.move(Tank.LEFT_DIRECTION);
     }
     
     if(keyIsDown(S_CODE)){  
       tank2.move(Tank.DOWN_DIRECTION);
     }

     else if(keyIsDown(W_CODE)){  
       tank2.move(Tank.UP_DIRECTION);
     }
     
     else {
       tank2.move(Tank.NO_DIRECTION);
     }
     
   }
  


}