const Sprites = {
    // Desenha o Jogador
    drawPlayer(ctx, x, y, className, fallbackColor) {
        const img = Assets[className]; 
        if (img && img.complete && img.naturalHeight !== 0) {
            ctx.drawImage(img, x, y, CONFIG.TILE, CONFIG.TILE);
        } else {
            // Fallback do Jogador
            ctx.fillStyle = fallbackColor;
            ctx.fillRect(x + 4, y + 4, 24, 24);
            ctx.fillStyle = "white";
            ctx.fillRect(x + 8, y + 8, 16, 12);
            ctx.fillStyle = "red";
            ctx.beginPath(); ctx.arc(x + 16, y + 16, 4, 0, Math.PI * 2); ctx.fill();
        }
    },

    // Desenha o Cenário
    drawTile(ctx, x, y, type) {
        let img = null;
        // MUDANÇA AQUI: Cor padrão para chão é verde escuro, não branco
        let fallbackColor = "#1a3a1a"; 

        if (type === 1) {
            img = Assets.wall;
            fallbackColor = "#444"; // Cor de parede se faltar imagem
        } else {
            img = Assets.floor;
            // fallbackColor já é verde escuro
        }

        if (img && img.complete && img.naturalHeight !== 0) {
            ctx.drawImage(img, x, y, CONFIG.TILE, CONFIG.TILE);
        } else {
            // Plano B do cenário: Desenha a cor sólida
            ctx.fillStyle = fallbackColor;
            ctx.fillRect(x, y, CONFIG.TILE, CONFIG.TILE);
            
            // Se for parede e estiver sem imagem, desenha uma borda para destacar
            if (type === 1) {
                 ctx.strokeStyle = "#222";
                 ctx.strokeRect(x, y, CONFIG.TILE, CONFIG.TILE);
            }
        }
    }
};
