let gameMap;
let current;


function setup() {
  new Canvas(960,480);
  
  displayMode('centered');

  gameMap = new Grid();
  gameMap.initGrid();
  gameMap.drawMap();
}

function draw() {
  background(220);
}
