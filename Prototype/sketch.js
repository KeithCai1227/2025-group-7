let gameMap;
let grid;
let cols;
let rows;
let current;
let cellsStack = [];


function setup() {
  new Canvas(960,480);
  
  displayMode('centered');

  //tiles = new Group();
  //setMap();
  frameRate(5);
  grid = [];
  gameMap = new Grid();
  gameMap.initGrid();
  current = grid[0][0];
  gameMap.drawMap();
}

function draw() {
  background(220);
  
  
  

  
  
  
  
  

}
