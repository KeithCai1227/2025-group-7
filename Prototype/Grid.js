let walls;
class Grid {
    constructor() {
        this.w = 80;
        this.cols = floor(height/this.w);
        this.rows = floor(width/this.w);
        this.celltack = [];
        this.grid = [];
        walls = new Group();
        walls.color = 'black';
        walls.stroke = 'black';
        walls.overlaps(walls);
        walls.collider = ('static');
        
    }

    initGrid() {
        for(let y = 0; y < this.rows; y++){
            let row = [];
            for(let x = 0; x < this.cols; x++){
                row.push(new Cell(y, x));
            }
            this.grid.push(row);
        }
        current = this.grid[0][0];
    }
    generateMap(){
        //do{
        current.visited++;
        
        let next = current.checkNeighbours();
        if(next){
            next.visited++;
            this.celltack.push(current);

            current.removeWall(next);

            current = next;
        }
        else if (this.celltack.length > 0){
            current = this.celltack.pop();
        }
    //}while(this.celltack != 0);
    }
    drawMap(){
        do {
        gameMap.generateMap();
        }while(this.celltack != 0);

        for(let i = 0; i < this.grid[0].length; i++){
            for(let j = 0; j < this.grid.length; j++){
            this.grid[j][i].show();
            }
        }
    }
}

