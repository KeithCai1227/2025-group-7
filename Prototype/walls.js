let tiles;
let tileSize = 24;
let cols = map1[0].length;
let  rows = map1.length;
let brickColors = ['#ab744f', '#a1591e', '#9c5536', '#7e411f', '#963f19'];


function setMap() {
  for(let row = 0; row < rows; row++){
    for(let col = 0; col < cols; col++){
      if(map1[row][col] === 1){
        let tile = new tiles.Sprite(col * tileSize + tileSize / 2, row * tileSize + tileSize / 2, tileSize, tileSize);

        tile.color = random(brickColors);
        tile.collider = 'static';
        tile.stroke = 'rgb(110, 100, 100)';
      }
    }
  }
} 

