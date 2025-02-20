let D_CODE = 68;
let A_CODE = 65;
let S_CODE = 83;
let W_CODE = 87;
let tanks;

class KeyListener {
   
   constructor (tanks) {
     this.tanks = tanks;
   }

   listenForKeys () { 

     if(keyIsDown(RIGHT_ARROW)){
       this.tanks[0].move(Tank.RIGHT_DIRECTION);
     }

     if(keyIsDown(LEFT_ARROW)){
       this.tanks[0].move(Tank.LEFT_DIRECTION);
     }

     if(keyIsDown(DOWN_ARROW)){
       this.tanks[0].move(Tank.DOWN_DIRECTION);
     }

     else if(keyIsDown(UP_ARROW)){
       this.tanks[0].move(Tank.UP_DIRECTION);
     }

     else {
       this.tanks[0].move(Tank.NO_DIRECTION);
     }
     
     if(keyIsDown(D_CODE)){ 
       this.tanks[1].move(Tank.RIGHT_DIRECTION);
     }
     
     if(keyIsDown(A_CODE)){  
       this.tanks[1].move(Tank.LEFT_DIRECTION);
     }
     
     if(keyIsDown(S_CODE)){  
       this.tanks[1].move(Tank.DOWN_DIRECTION);
     }

     else if(keyIsDown(W_CODE)){  
       this.tanks[1].move(Tank.UP_DIRECTION);
     }
     
     else {
       this.tanks[1].move(Tank.NO_DIRECTION);
     }
     
   }
  


}
