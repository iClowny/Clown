class Player {
    constructor(className) {
        this.x = 10;
        this.y = 10;
        this.lvl = 1;
        this.xp = 0;
        this.nextLvl = 100;
        this.potions = 3;
        
        // Define atributos por classe
        const stats = {
            warrior: { hp: 150, mp: 20, atk: 15, color: '#ff4444', name: 'Guerreiro' },
            mage:    { hp: 80,  mp: 100, atk: 8,  color: '#4444ff', name: 'Mago' },
            arrow:   { hp: 110, mp: 50,  atk: 12, color: '#44ff44', name: 'Arqueiro' }
        };

        const config = stats[className];
        this.class = config.name;
        this.color = config.color;
        this.hp = this.maxHp = config.hp;
        this.mp = this.maxMp = config.mp;
        this.atk = config.atk;
    }

    gainXp(amount) {
        this.xp += amount;
        if (this.xp >= this.nextLvl) {
            this.levelUp();
        }
        this.updateHud();
    }

    levelUp() {
        this.lvl++;
        this.xp = 0;
        this.nextLvl = Math.floor(this.nextLvl * 1.5);
        this.maxHp += 20;
        this.maxMp += 15;
        this.hp = this.maxHp;
        this.mp = this.maxMp;
        alert(`LEVEL UP! Você agora é nível ${this.lvl}`);
    }

    updateHud() {
        document.getElementById('hp-val').innerText = this.hp;
        document.getElementById('mp-val').innerText = this.mp;
        document.getElementById('lvl-val').innerText = this.lvl;
    }
}