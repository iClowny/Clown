class Player {
    constructor(className) {
        this.x = 5; 
        this.y = 5;
        this.lvl = 1;
        this.xp = 0;
        this.nextLvl = 100;
        
        // --- REGISTRO DE QUESTS ---
        this.quests = {
            active: false,      // Tem missão ativa?
            mimicKilled: false, // Matou o boss?
            rewardClaimed: false // Já pegou o ouro?
        };

        const stats = {
            warrior: { hp: 150, mp: 20, atk: 15, color: '#ff4444' },
            mage:    { hp: 80,  mp: 100, atk: 8,  color: '#4444ff' },
            arrow:   { hp: 110, mp: 50,  atk: 12, color: '#44ff44' }
        };

        // Aplica os atributos da classe escolhida
        const myStat = stats[className];
        this.hp = this.maxHp = myStat.hp;
        this.mp = this.maxMp = myStat.mp;
        this.atk = myStat.atk;
        this.color = myStat.color;
        this.class = className; // Salva o nome da classe para os sprites
    }

    gainXp(amount) {
        this.xp += amount;
        if(this.xp >= this.nextLvl) {
            this.lvl++;
            this.xp = 0;
            this.nextLvl = Math.floor(this.nextLvl * 1.5);
            this.maxHp += 20; 
            this.hp = this.maxHp;
            alert("Level UP! Nível " + this.lvl);
        }
        this.updateHud();
    }
    
    updateHud() {
        document.getElementById('hp-val').innerText = this.hp;
        document.getElementById('mp-val').innerText = this.mp;
        document.getElementById('lvl-val').innerText = this.lvl;
    }
}