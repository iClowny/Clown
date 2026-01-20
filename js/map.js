class GameMap {
    constructor() {
        this.data = [];
        this.generate();
    }
    generate() {
        for (let y = 0; y < CONFIG.MAP_SIZE; y++) {
            this.data[y] = [];
            for (let x = 0; x < CONFIG.MAP_SIZE; x++) {
                this.data[y][x] = (Math.random() < 0.1 && x > 6) ? 1 : 0;
            }
        }
    }
    isWall(x, y) {
        if (x < 0 || y < 0 || x >= CONFIG.MAP_SIZE || y >= CONFIG.MAP_SIZE) return true;
        return this.data[y][x] === 1;
    }
}