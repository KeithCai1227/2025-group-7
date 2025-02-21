let cells;

let w= 80;

class Grid {
    constructor() {
        cols = floor(height/w);
        rows = floor(width/w);
        console.log(cols, rows);
        cells = new Group();
        cells.color = 'black';
        cells.stroke = 'black';
        cells.overlaps(cells);
        
    }

    initGrid() {
        for(let y = 0; y < rows; y++){
            let row = [];
            for(let x = 0; x < cols; x++){
                row.push(new Cell(y, x));
            }
            grid.push(row);
        }
        
    }
    generateMap(){
        //do{
        current.visited++;
        
        let next = current.checkNeighbours();
        if(next){
            next.visited++;
            cellsStack.push(current);

            current.removeWall(next);

            current = next;
        }
        else if (cellsStack.length > 0){
            current = cellsStack.pop();
        }
    //}while(cellsStack != 0);
    }
    drawMap(){
        do {
        gameMap.generateMap();
        }while(cellsStack != 0);

        for(let i = 0; i < grid[0].length; i++){
            for(let j = 0; j < grid.length; j++){
            grid[j][i].show();
            }
        }
    }
}

class Cell {
    constructor(i, j){
        this.i = i;
        this.j = j;
        this.walls = {"top": true, "right": true, "bottom": true, "left": true};
        this.visited = 0;
    }
    show(){
        let x = this.i*w;
        let y = this.j*w;
        
        if(this.walls["top"]){
            this.top = new cells.Sprite(x+w/2,y,w,1);
            this.top.rotation = 0;
        } 
        if(!this.walls["top"] && this.top){
            this.top.remove();
        }
        if(this.walls["right"]){
            this.right = new cells.Sprite(x,y+w/2,w,1);
            this.right.rotation = 90;
        }
        if(!this.walls["right"] && this.right){
            this.right.remove();
        }
        if(this.walls["bottom"]){
            this.bottom = new cells.Sprite(x+w/2,y+w,w,1);
            this.bottom.rotation = 0;
        }
        if(!this.walls["bottom"] && this.bottom){
            this.bottom.remove();
        }
        if(this.walls["left"]){
            this.left = new cells.Sprite(x+w,y+w/2,w,1);
            this.left.rotation = 90;
        }
        if(!this.walls["left"] && this.left){
            this.left.remove();
        }

    }
    checkNeighbours(){
        this.neighbours = []
        let top = this.i > 0 ? grid[this.i - 1][this.j] : undefined;
        let right = this.j < cols - 1 ? grid[this.i][this.j + 1] : undefined;
        let bottom = this.i < rows - 1 ? grid[this.i + 1][this.j] : undefined;
        let left = this.j > 0 ? grid[this.i][this.j - 1] : undefined;
        
        if(top && top.visited <= (random() < 0.05? 3 : 2)){ //check top
       this.neighbours.push(top);
        }
        if(right && right.visited <= (random() < 0.05? 3 : 2)){ //check right
       this.neighbours.push(right);
        }
        if(bottom && bottom.visited <= (random() < 0.05? 3 : 2)){ //check bottom
       this.neighbours.push(bottom);
        }
        if(left && left.visited <= (random() < 0.05? 3 : 2)){ //check left
       this.neighbours.push(left);
        }

        if (this.neighbours.length > 0) {
            let next = floor(random(0, this.neighbours.length));
            return this.neighbours[next];
        } 
        else {
            return undefined;
        }
    }  
    removeWall(c) {
        let x = this.i - c.i;
        if(x === 1) {
            this.walls["right"] = false;
            c.walls["left"] = false;
        }
        else if(x === -1) {
            this.walls["left"] = false;
            c.walls["right"] = false;
        }
        let y = this.j - c.j;
        if(y === 1){
            this.walls["top"] = false;
            c.walls["bottom"] = false;
        }
        else if(y === -1){
            this.walls["bottom"] = false;
            c.walls["top"] = false;

        }
    }
}
