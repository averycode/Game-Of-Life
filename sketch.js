let size = 600;
let resolution = 10;

let grid;

let cols;
let rows;

let FPS = 15;

function setup() {
    createCanvas(size, size);
    background(0);
    frameRate(FPS);
    cols = height / resolution;
    rows = width / resolution;
    grid = createGrid(rows, cols);
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            grid[i][j] = floor(random(2));
        }
    }
    console.table(grid);
}

function draw() {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            line(j * resolution, 0, j * resolution, width);
            line(0, i * resolution, width, i * resolution);
        }
    }

    let next = createGrid(rows, cols);

    for (let i = 0; i < next.length; i++) {
        for (let j = 0; j < next[i].length; j++) {
            let status = grid[i][j];
            let neighbors = getNeighbors(grid, i, j);
            //print(neighbors);
            if (status == 0 && neighbors == 3) {
                next[i][j] = 1;
            } else if (status == 1 && (neighbors < 2 || neighbors > 3)) {
                next[i][j] = 0;
            } else {
                next[i][j] = status;
            }
        }
    }
    grid = next;
    showGrid(grid);
}

function showGrid(grid) {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] == 1) {
                fill(0, 200, 80);
                rect(j * resolution, i * resolution, resolution, resolution);
            } else {
                fill(0);
                rect(j * resolution, i * resolution, resolution, resolution);
            }
        }
    }
}

function getNeighbors(grid, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            sum += grid[(x + i + rows) % rows][(y + j + cols) % cols];
        }
    }
    sum -= grid[x][y];
    return sum;
}

function createGrid(c, r) {
    let grid = new Array(c);
    for (let i = 0; i < grid.length; i++) {
        grid[i] = new Array(r);
    }
    return grid;
}

/*
Game of Life Regeln:
1. tote Zelle - bei drei lebenden Nachbarn -> lebend
2. lebende Zelle - bei weniger als 2 oder mehr als 3 Nachbarn -> stirbt
*/
