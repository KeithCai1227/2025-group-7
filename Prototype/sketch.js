let gameMap;
let grid;
let cols;
let rows;
let current;
let cellsStack = [];


function setup() {
  new Canvas(400,400);
  
  displayMode('centered');

  //tiles = new Group();
  //setMap();

  grid = [];
  gameMap = new Grid();
  gameMap.initGrid();
  current = grid[0][0];
  for(let i =0; i < 200; i++){
    gameMap.generateMap();
  }
  
  
}

function draw() {
  background(220);
  
  
  
  

  
  
    for(let i = 0; i < grid[0].length; i++){
      for(let j = 0; j < grid.length; j++){
        grid[j][i].show();
      }
    }
  
  
  

}
