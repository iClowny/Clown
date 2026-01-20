class Player {
    constructor(className) {
        this.x = 5;
        this.y = 5;
        this.lvl = 1;
        this.xp = 0;
        
        // Atributos baseados na classe
        const stats = {
            warrior: { hp: 150, mp: 20, atk: 15, color: '#ff4444' },
            mage:    { hp: 80,  mp: 100, atk: 8,  color: '#4444ff' },
            arrow:   { hp: 110, mp: 50,  atk: 12, color: '#44ff44' }
        };

        const myStat = stats[className];
        this.hp = this.maxHp = myStat.hp;
        this.mp = this.maxMp = myStat.mp;
        this.atk = myStat.atk;
        this.color = myStat.color;
    }

    updateHud() {
        document.getElementById('hp-val').innerText = this.hp;
        document.getElementById('mp-val').innerText = this.mp;
        document.getElementById('lvl-val').innerText = this.lvl;
    }
}