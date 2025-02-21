class Cell {
    constructor(i, j){
        this.w = gameMap.w;
        this.wallWidth = 15;
        this.grid = gameMap.grid;
        this.cols = gameMap.cols;
        this.rows = gameMap.rows;
        this.i = i;
        this.j = j;
        this.wallState = {"top": true, "right": true, "bottom": true, "left": true};
        this.visited = 0;
    }
    show(){
        let x = this.i*this.w;
        let y = this.j*this.w;
        
        if(this.wallState["top"]){
            this.top = new walls.Sprite(x+this.w/2,y,this.w+this.wallWidth,this.wallWidth);
            this.top.rotation = 0;
        } 
        if(!this.wallState["top"] && this.top){
            this.top.remove();
        }
        if(this.wallState["right"]){
            this.right = new walls.Sprite(x,y+this.w/2,this.w+this.wallWidth,this.wallWidth);
            this.right.rotation = 90;
        }
        if(!this.wallState["right"] && this.right){
            this.right.remove();
        }
        if(this.wallState["bottom"]){
            this.bottom = new walls.Sprite(x+this.w/2,y+this.w,this.w+this.wallWidth,this.wallWidth);
            this.bottom.rotation = 0;
        }
        if(!this.wallState["bottom"] && this.bottom){
            this.bottom.remove();
        }
        if(this.wallState["left"]){
            this.left = new walls.Sprite(x+this.w,y+this.w/2,this.w+this.wallWidth,this.wallWidth);
            this.left.rotation = 90;
        }
        if(!this.wallState["left"] && this.left){
            this.left.remove();
        }

    }
    checkNeighbours(){
        this.neighbours = []
        let top = this.i > 0 ? this.grid[this.i - 1][this.j] : undefined;
        let right = this.j < this.cols - 1 ? this.grid[this.i][this.j + 1] : undefined;
        let bottom = this.i < this.rows - 1 ? this.grid[this.i + 1][this.j] : undefined;
        let left = this.j > 0 ? this.grid[this.i][this.j - 1] : undefined;
        
        if(top && top.visited < (random() < 0.09? 4 : 2)){ //check top
       this.neighbours.push(top);
        }
        if(right && right.visited < (random() < 0.09? 4 : 2)){ //check right
       this.neighbours.push(right);
        }
        if(bottom && bottom.visited < (random() < 0.09? 4 : 2)){ //check bottom
       this.neighbours.push(bottom);
        }
        if(left && left.visited < (random() < 0.09? 4 : 2)){ //check left
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
            this.wallState["right"] = false;
            c.wallState["left"] = false;
        }
        else if(x === -1) {
            this.wallState["left"] = false;
            c.wallState["right"] = false;
        }
        let y = this.j - c.j;
        if(y === 1){
            this.wallState["top"] = false;
            c.wallState["bottom"] = false;
        }
        else if(y === -1){
            this.wallState["bottom"] = false;
            c.wallState["top"] = false;

        }
    }
}
