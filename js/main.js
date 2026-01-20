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
        
        // Desenha uma tela preta inicial
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0,0,this.canvas.width, this.canvas.height);

        window.addEventListener('keydown', (e) => this.handleInput(e));
        console.log("Jogo Pronto. Aguardando Start...");
    },

    // ESTA É A FUNÇÃO QUE O BOTÃO CHAMA
    start(className) {
        console.log("Classe escolhida:", className);
        this.player = new Player(className);
        this.mode = 'EXPLORE';
        
        // Some com o menu
        document.getElementById('screen-selector').style.display = 'none';
        
        this.player.updateHud();
        this.render();
    },

    handleInput(e) {
        if (this.mode !== 'EXPLORE') return;

        let dx = 0, dy = 0;
        if (e.key === "ArrowUp") dy = -1;
        if (e.key === "ArrowDown") dy = 1;
        if (e.key === "ArrowLeft") dx = -1;
        if (e.key === "ArrowRight") dx = 1;

        if(dx !== 0 || dy !== 0) {
            const nx = this.player.x + dx;
            const ny = this.player.y + dy;

            if (!this.map.isWall(nx, ny)) {
                this.player.x = nx;
                this.player.y = ny;
                
                // 10% de chance de luta
                if(Math.random() < 0.1) {
                    Combat.initiate('mimic');
                } else {
                    this.render();
                }
            }
        }
    },

    render() {
        // Limpa
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Câmera
        const cx = this.player.x - Math.floor(CONFIG.W / 2);
        const cy = this.player.y - Math.floor(CONFIG.H / 2);

        for (let y = 0; y < CONFIG.H; y++) {
            for (let x = 0; x < CONFIG.W; x++) {
                const wx = cx + x;
                const wy = cy + y;
                
                let type = 1; // Padrão parede se fora do mapa
                if(this.map.data[wy] && this.map.data[wy][wx] !== undefined) {
                    type = this.map.data[wy][wx];
                }

                Sprites.drawTile(this.ctx, x * CONFIG.TILE, y * CONFIG.TILE, type);
            }
        }

        // Desenha Player no centro
        Sprites.drawPlayer(
            this.ctx, 
            Math.floor(CONFIG.W/2) * CONFIG.TILE, 
            Math.floor(CONFIG.H/2) * CONFIG.TILE, 
            this.player.class.toLowerCase(), // Passa 'warrior', 'mage', etc.
            this.player.color
        );
    }
};

// Inicia tudo
Game.init();