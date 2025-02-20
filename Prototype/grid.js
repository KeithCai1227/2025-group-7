let cells;

let w= 50;

class Grid {
    constructor() {
        cols = floor(width/w);
        rows = floor(height/w);
        
        cells = new Group();
        cells.color = 'black';
        cells.stroke = 'black';
        cells.overlaps(cells);
        
    }

    initGrid() {
        for(let y = 0; y <= rows; y++){
            let row = [];
            for(let x = 0; x <= cols; x++){
                row.push(new Cell(y, x));
            }
            grid.push(row);
        }
        
    }
    generateMap(){
        
        current.visited = true;
        
        let next = current.checkNeighbours();
        if(next){
            next.visited = true;
            cellsStack.push(current);

            current.removeWall(next);

            current = next;
        }
        else if (cellsStack.length > 0){
            current = cellsStack.pop();
        }
    }
}

class Cell {
    constructor(i, j){
        this.i = i;
        this.j = j;
        this.walls = {"top": true, "right": true, "bottom": true, "left": true};
        this.visited = false;
    }
    show(){
        let x = this.i*w;
        let y = this.j*w;
        
        if(this.walls["top"]){
            this.top = new cells.Sprite(x+w/2,y,w,1);
            this.top.rotation = 0;
        } 
        if(this.walls["right"]){
            this.right = new cells.Sprite(x,y+w/2,w,1);
            this.right.rotation = 90;
        }
        if(this.walls["bottom"]){
            this.bottom = new cells.Sprite(x+w/2,y+w,w,1);
            this.bottom.rotation = 0;
        }
        if(this.walls["left"]){
            this.left = new cells.Sprite(x+w,y+w/2,w,1);
            this.left.rotation = 90;
        }
        if(this.visited){
            noStroke();
            fill(255, 0, 255, 100);
            rect(x, y, w, w);
            
        }
    }
    checkNeighbours(){
        this.neighbours = []
        let top = this.i > 0 ? grid[this.i - 1][this.j] : undefined;
        let right = this.j < cols - 1 ? grid[this.i][this.j + 1] : undefined;
        let bottom = this.i < rows - 1 ? grid[this.i + 1][this.j] : undefined;
        let left = this.j > 0 ? grid[this.i][this.j - 1] : undefined;
        
        if(top && !top.visited){ //check top
       this.neighbours.push(top);
        }
        if(right && !right.visited){ //check right
       this.neighbours.push(right);
        }
        if(bottom && !bottom.visited){ //check bottom
       this.neighbours.push(bottom);
        }
        if(left && !left.visited){ //check left
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
            this.walls["left"] = false;
            c.walls["right"] = false;
        }
        else if(x === -1) {
            this.walls["right"] = false;
            c.walls["left"] = false;
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
