const Combat = {
    active: false,
    enemy: null,

    initiate(type) {
        this.active = true;
        Game.mode = 'BATTLE'; // Pausa o mapa
        
        // Define inimigo
        this.enemy = { name: "Mímico", hp: 50, max: 50, atk: 10, xp: 50 };
        
        // Atualiza HTML da batalha
        document.getElementById('battle-overlay').style.display = 'flex';
        document.getElementById('battle-title').innerText = this.enemy.name;
        document.getElementById('e-hp').innerText = this.enemy.hp;
    },

    attack() {
        if(!this.active) return;
        const dmg = Game.player.atk;
        this.hitEnemy(dmg);
    },

    magic() {
        if(!this.active) return;
        if(Game.player.mp >= 10) {
            Game.player.mp -= 10;
            Game.player.updateHud();
            this.hitEnemy(Game.player.atk * 3);
        } else {
            alert("Sem Mana!");
        }
    },

    hitEnemy(dmg) {
        this.enemy.hp -= dmg;
        document.getElementById('e-hp').innerText = this.enemy.hp;
        
        if(this.enemy.hp <= 0) {
            alert("Venceu!");
            this.end();
        } else {
            // Contra-ataque simples
            setTimeout(() => {
                Game.player.hp -= this.enemy.atk;
                Game.player.updateHud();
                if(Game.player.hp <= 0) {
                    alert("Game Over");
                    location.reload();
                }
            }, 200);
        }
    },

    flee() {
        alert("Fugiu!");
        this.end();
    },

    end() {
        this.active = false;
        Game.mode = 'EXPLORE';
        document.getElementById('battle-overlay').style.display = 'none';
        Game.render();
    }
};