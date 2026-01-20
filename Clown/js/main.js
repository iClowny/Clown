// ... dentro do objeto Game em main.js ...

    start(className) {
        this.player = new Player(className); // Agora usa a classe Player
        this.mode = 'EXPLORE';
        document.getElementById('screen-selector').style.display = 'none';
        this.player.updateHud();
        this.render();
    },

    handleInput(e) {
        if (!this.player || this.mode !== 'EXPLORE') return;

        let dx = 0, dy = 0;
        if (e.key === "ArrowUp") dy = -1;
        if (e.key === "ArrowDown") dy = 1;
        if (e.key === "ArrowLeft") dx = -1;
        if (e.key === "ArrowRight") dx = 1;

        const nextX = this.player.x + dx;
        const nextY = this.player.y + dy;

        if (!this.map.isWall(nextX, nextY)) {
            this.player.x = nextX;
            this.player.y = nextY;
            
            // Chance de encontro aleatório (5%)
            if(Math.random() < 0.05) {
                Combat.initiate('mimic');
            }

            this.render();
        }
    },
// ... restante do render ...