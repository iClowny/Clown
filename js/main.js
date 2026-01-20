const Game = {
    canvas: document.getElementById('gameCanvas'),
    ctx: null,
    player: null,
    map: null,
    mode: 'MENU',

    init() {
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = CONFIG.W * CONFIG.TILE;
        this.canvas.height = CONFIG.H * CONFIG.TILE;
        this.map = new GameMap();
        
        // Inicia NPCs
        NPC.init(); 

        window.addEventListener('keydown', (e) => this.handleInput(e));
        console.log("Jogo pronto.");
    },

    start(className) {
        this.player = new Player(className);
        this.mode = 'EXPLORE';
        document.getElementById('screen-selector').style.display = 'none';
        this.player.updateHud();
        this.render();
    },

    handleInput(e) {
        if (this.mode !== 'EXPLORE') return;

        let dx = 0, dy = 0;
        if (e.key === "ArrowUp" || e.key === "w") dy = -1;
        if (e.key === "ArrowDown" || e.key === "s") dy = 1;
        if (e.key === "ArrowLeft" || e.key === "a") dx = -1;
        if (e.key === "ArrowRight" || e.key === "d") dx = 1;

        if(dx !== 0 || dy !== 0) {
            const nx = this.player.x + dx;
            const ny = this.player.y + dy;

            // 1. Parede?
            if (this.map.isWall(nx, ny)) return;

            // 2. NPC?
            const npc = NPC.getAt(nx, ny);
            if (npc) {
                NPC.interact(npc); 
                return; 
            }

            // 3. Move
            this.player.x = nx;
            this.player.y = ny;
            
            // 4. Batalha (10% chance)
            if(Math.random() < 0.1) {
                Combat.initiate('mimic');
            } else {
                this.render();
            }
        }
    },

    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        const cx = this.player.x - Math.floor(CONFIG.W / 2);
        const cy = this.player.y - Math.floor(CONFIG.H / 2);

        // Mapa
        for (let y = 0; y < CONFIG.H; y++) {
            for (let x = 0; x < CONFIG.W; x++) {
                const wx = cx + x;
                const wy = cy + y;
                let type = 1;
                if(this.map.data[wy] && this.map.data[wy][wx] !== undefined) {
                    type = this.map.data[wy][wx];
                }
                Sprites.drawTile(this.ctx, x * CONFIG.TILE, y * CONFIG.TILE, type);
            }
        }

        // NPCs
        NPC.draw(this.ctx);

        // Player
        Sprites.drawPlayer(
            this.ctx, 
            Math.floor(CONFIG.W/2) * CONFIG.TILE, 
            Math.floor(CONFIG.H/2) * CONFIG.TILE, 
            this.player.class,
            this.player.color
        );
    }
};

Game.init();