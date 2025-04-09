let walls;
class Grid {
	current;
    constructor(gridHeight) {
        this.w = 120;
        this.cols = floor(gridHeight/this.w); // 4
        this.rows = floor(width/this.w+2); // 10
        this.celltack = [];
        this.grid = [];
        walls = new Group();
        walls.color = 'red';
        walls.stroke = 'red';
        walls.strokeWeight = '0';
        walls.overlaps(walls);
        walls.collider = ('static');
        walls.autoDraw = false;
        walls.autoUpdate = false;
    }

    initGrid() {
        for(let y = 0; y < this.rows; y++){
            let row = [];
            for(let x = 0; x < this.cols; x++){
                row.push(new Cell(y, x, this.grid, this.cols, this.rows, this.w));
            }
            this.grid.push(row);
        }
        this.current = this.grid[0][0];
    }
    generateMap(){
        //do{
        this.current.visited++;
        
        let next = this.current.checkNeighbours();
        if(next){
            next.visited++;
            this.celltack.push(this.current);

            this.current.removeWall(next);

            this.current = next;
        }
        else if (this.celltack.length > 0){
            this.current = this.celltack.pop();
        }
    //}while(this.celltack != 0);
    }
    initMap(){
        
        do {
            this.generateMap();
        }while(this.celltack != 0);

        for(let i = 0; i < this.grid[0].length; i++){
            for(let j = 0; j < this.grid.length; j++){
            // remove overlapping walls
            this.grid[j][i].removeOverlappingWalls();
            this.grid[j][i].show();
            }
        }
    }

    draw() {

        drawingContext.shadowBlur = 15;
        drawingContext.shadowColor = color(255, 150, 150);
        
        walls.draw();
        drawingContext.shadowBlur = 0;
        drawingContext.shadowColor = 'transparent';
    }

    update() {
        walls.update();
    }
}

