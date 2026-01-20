const NPC = {
    list: [], 

    init() {
        this.list = [
            { 
                id: 'king', name: 'Rei Palhaço', x: 8, y: 8, 
                sprite: 'mage', color: '#ffff00',
                dialog: "Ah, um herói! Por favor, derrote o Mímico!"
            },
            {
                id: 'guard', name: 'Guarda Real', x: 12, y: 5,
                sprite: 'warrior', color: '#aaaaaa',
                dialog: "Cuidado! Monstros perigosos à frente."
            }
        ];
    },

    getAt(x, y) {
        return this.list.find(n => n.x === x && n.y === y);
    },

    interact(npc) {
        let text = npc.dialog;

        // Lógica da Quest do Rei
        if (npc.id === 'king') {
            if (Game.player.quests.mimicKilled) {
                if (!Game.player.quests.rewardClaimed) {
                    text = "Incrível! Você derrotou o Mímico. Tome 100 XP!";
                    Game.player.gainXp(100);
                    Game.player.quests.rewardClaimed = true;
                } else {
                    text = "Obrigado por salvar o reino!";
                }
            } else {
                Game.player.quests.active = true;
                text = "Minha coroa foi roubada por um Mímico! Mate-o!";
            }
        }

        this.showDialog(npc.name, text);
    },

    showDialog(name, text) {
        document.getElementById('dialog-box').style.display = 'flex';
        document.getElementById('npc-name').innerText = name;
        document.getElementById('npc-text').innerText = text;
        Game.mode = 'DIALOG';
    },

    closeDialog() {
        document.getElementById('dialog-box').style.display = 'none';
        Game.mode = 'EXPLORE';
    },

    draw(ctx) {
        this.list.forEach(npc => {
            const screenX = (npc.x - (Game.player.x - Math.floor(CONFIG.W/2))) * CONFIG.TILE;
            const screenY = (npc.y - (Game.player.y - Math.floor(CONFIG.H/2))) * CONFIG.TILE;
            Sprites.drawPlayer(ctx, screenX, screenY, npc.sprite, npc.color);
        });
    }
};