class Cell {

    constructor(i, j,grid, cols, rows, cellWidth){
        this.w = cellWidth;
        this.wallLength = this.w/2+2.3;
        this.wallWidth = 3;
        this.radius = sqrt(3)/2 * this.wallLength - this.wallWidth/2;
        this.grid = grid;
        this.cols = cols;
        this.rows = rows;
        this.i = i;
        this.j = j;
        this.centerX = this.i * 3/2 * this.wallLength + this.wallLength;
        this.centerY = this.j * sqrt(3) * this.wallLength + sqrt(3)/2 * this.wallLength + (i%2 === 0? 0 : sqrt(3)/2 * this.wallLength - 2);
        // Hexagon with 6 sides in wallState
        this.wallState = {"top": true, "topRight": true, "bottomRight": true, "bottom": true, "bottomLeft": true, "topLeft": true};
        this.visited = 0;
    }
    show() {
        // Calculate center position

        // Adjuust for neighboring cells to have overlapping walls
        this.centerX -= this.wallWidth * this.i;
        this.centerY -= this.wallWidth * this.j;

        
    
        // List all cell walls with their angles and outer conditions
        const cellWalls = [
            { name: "top", angle: 0, outer: this.j === 0 },
            { name: "topRight", angle: 60, outer: this.i === this.rows-1 || this.j === (this.i % 2 ? this.cols-1 : 0) },
            { name: "bottomRight", angle: 120, outer: this.i === this.rows-1 || this.j === (this.i % 2 ? this.cols-1 : 0) },
            { name: "bottom", angle: 180, outer: this.j === this.cols-1 },
            { name: "bottomLeft", angle: 240, outer: this.i === 0 || this.j === (this.i % 2 ? this.cols-1 : 0) },
            { name: "topLeft", angle: 300, outer: this.i === 0 || this.j === (this.i % 2 ? this.cols-1 : 0) }
        ];
    
        // Handle each wall
        cellWalls.forEach(wall => {
            // Remove wall if it exists but shouldn't
            if (!this.wallState[wall.name] && this[wall.name]) {
                this[wall.name].remove();
                return;
            }
    
            // Create wall if needed
            if (this.wallState[wall.name]) {
                const x = this.centerX + this.radius * sin(wall.angle);
                const y = this.centerY - this.radius * cos(wall.angle);
                
                this[wall.name] = new walls.Sprite(x, y, this.wallLength, this.wallWidth);
                this[wall.name].rotation = wall.angle;
                
                if (wall.outer) {
                    this[wall.name].outerWall = true;
                }
            }
        });
    }

    checkNeighbours() {
        this.neighbours = [];
        
        // Hexagonal grid neighbors (6 directions)
        const directions = [
            { dx: 0, dy: -1, name: "top" },        // above
            { dx: 1, dy: this.i % 2 ? 0 : -1, name: "topRight" },  // top-right
            { dx: 1, dy: this.i % 2 ? 1 : 0, name: "bottomRight" }, // bottom-right
            { dx: 0, dy: 1, name: "bottom" },       // below
            { dx: -1, dy: this.i % 2 ? 1 : 0, name: "bottomLeft" }, // bottom-left
            { dx: -1, dy: this.i % 2 ? 0 : -1, name: "topLeft" }    // top-left
        ];
        
        for (let dir of directions) {
            const ni = this.i + dir.dx;
            const nj = this.j + dir.dy;
            
            if (ni >= 0 && ni < this.rows && nj >= 0 && nj < this.cols) {
                const neighbor = this.grid[ni][nj];
                if (neighbor.visited < (random() < 0.09 ? 4 : 2)) {
                    this.neighbours.push(neighbor);
                }
            }
        }

        if (this.neighbours.length > 0) {
            return random(this.neighbours);
        }
        return undefined;
    }

    removeWall(neighbour) {
        // Calculate relative position
        const dx = neighbour.i - this.i;
        const dy = neighbour.j - this.j;
        
        // Hexagonal grid wall removal
        if (dx === 0 && dy === -1) { // above (top)
            this.wallState.top = false;
            neighbour.wallState.bottom = false;
        } else if (dx === 0 && dy === 1) { // below (bottom)
            this.wallState.bottom = false;
            neighbour.wallState.top = false;
        } else if (dx === 1) {
            if (this.i % 2) {
                if (dy === 0) { // top-right
                    this.wallState.topRight = false;
                    neighbour.wallState.bottomLeft = false;
                } else if (dy === 1) { // bottom-right
                    this.wallState.bottomRight = false;
                    neighbour.wallState.topLeft = false;
                }
            } else {
                if (dy === -1) { // top-right
                    this.wallState.topRight = false;
                    neighbour.wallState.bottomLeft = false;
                } else if (dy === 0) { // bottom-right
                    this.wallState.bottomRight = false;
                    neighbour.wallState.topLeft = false;
                }
            }
        } else if (dx === -1) {
            if (this.i % 2) {
                if (dy === 0) { // top-left
                    this.wallState.topLeft = false;
                    neighbour.wallState.bottomRight = false;
                } else if (dy === 1) { // bottom-left
                    this.wallState.bottomLeft = false;
                    neighbour.wallState.topRight = false;
                }
            } else {
                if (dy === -1) { // top-left
                    this.wallState.topLeft = false;
                    neighbour.wallState.bottomRight = false;
                } else if (dy === 0) { // bottom-left
                    this.wallState.bottomLeft = false;
                    neighbour.wallState.topRight = false;
                }
            }
        }
    }
    removeOverlappingWalls() {
        // Remove overlapping walls with neighboring cells
        const directions = [
            { dx: 0, dy: -1, name: "top", oposite: "bottom" },
            { dx: 1, dy: this.i % 2 ? 0 : -1, name: "topRight", oposite: "bottomLeft" },
            { dx: 1, dy: this.i % 2 ? 1 : 0, name: "bottomRight", oposite: "topLeft" },
            { dx: 0, dy: 1, name: "bottom", oposite: "top" },
            { dx: -1, dy: this.i % 2 ? 1 : 0, name: "bottomLeft", oposite: "topRight" },
            { dx: -1, dy: this.i % 2 ? 0 : -1, name: "topLeft", oposite: "bottomRight" }
        ];
        for (let dir of directions) {
            const ni = this.i + dir.dx;
            const nj = this.j + dir.dy;
            
            if (ni >= 0 && ni < this.rows && nj >= 0 && nj < this.cols) {
                const neighbour = this.grid[ni][nj];
                if (this.wallState[dir.name]) {
                    neighbour.wallState[dir.oposite] = false;    
                }
            }
        }
    }
}
