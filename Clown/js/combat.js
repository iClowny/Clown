const Combat = {
    active: false,
    enemy: null,

    initiate(enemyType) {
        this.active = true;
        Game.mode = 'BATTLE'; // Bloqueia movimento no main.js
        
        // Configura inimigo
        if(enemyType === 'mimic') {
            this.enemy = { name: "Mímico", hp: 60, max: 60, atk: 12, xp: 50 };
        } else {
            this.enemy = { name: "Sombra", hp: 150, max: 150, atk: 20, xp: 150 };
        }

        this.showBattleUI();
    },

    showBattleUI() {
        // Aqui você pode criar um elemento HTML via JS ou usar um que já exista oculto
        const battleDiv = document.createElement('div');
        battleDiv.id = "battle-overlay";
        battleDiv.className = "overlay";
        battleDiv.innerHTML = `
            <h2>LUTA CONTRA ${this.enemy.name.toUpperCase()}</h2>
            <p>HP Inimigo: <span id="e-hp">${this.enemy.hp}</span></p>
            <div class="class-options">
                <button onclick="Combat.attack()">ATACAR</button>
                <button onclick="Combat.magic()">MAGIA</button>
                <button onclick="Combat.flee()">FUGIR</button>
            </div>
        `;
        document.body.appendChild(battleDiv);
    },

    attack() {
        const dmg = Game.player.atk + Math.floor(Math.random() * 5);
        this.enemy.hp -= dmg;
        this.checkStatus();
        if(this.active) this.enemyTurn();
    },

    magic() {
        if(Game.player.mp >= 10) {
            Game.player.mp -= 10;
            const dmg = Game.player.atk * 3;
            this.enemy.hp -= dmg;
            Game.player.updateHud();
            this.checkStatus();
            if(this.active) this.enemyTurn();
        } else {
            alert("Sem Mana!");
        }
    },

    enemyTurn() {
        setTimeout(() => {
            const dmg = this.enemy.atk;
            Game.player.hp -= dmg;
            Game.player.updateHud();
            document.getElementById('e-hp').innerText = this.enemy.hp;
            
            if(Game.player.hp <= 0) {
                alert("Game Over!");
                location.reload();
            }
        }, 500);
    },

    checkStatus() {
        if(this.enemy.hp <= 0) {
            alert(`Você venceu! +${this.enemy.xp} XP`);
            Game.player.gainXp(this.enemy.xp);
            this.end();
        }
    },

    end() {
        this.active = false;
        Game.mode = 'EXPLORE';
        const overlay = document.getElementById('battle-overlay');
        if(overlay) overlay.remove();
    },

    flee() {
        if(Math.random() > 0.4) {
            alert("Fugiu com sucesso!");
            this.end();
        } else {
            alert("Falhou em fugir!");
            this.enemyTurn();
        }
    }
};