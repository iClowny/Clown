const Sprites = {
    // Desenha o Jogador
    drawPlayer(ctx, x, y, className, fallbackColor) {
        // Tenta pegar a imagem correspondente à classe (ex: Assets.warrior)
        const img = Assets[className]; 

        // Verifica se a imagem existe e foi carregada
        if (img && isLoaded(img)) {
            // Desenha a imagem (arquivo PNG)
            // ctx.drawImage(imagem, x, y, largura, altura);
            ctx.drawImage(img, x, y, CONFIG.TILE, CONFIG.TILE);
        } else {
            // --- PLANO B (FALLBACK) ---
            // Se não tiver imagem, desenha o quadrado colorido antigo
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
        let fallbackColor = "#000";

        if (type === 1) {
            img = Assets.wall;
            fallbackColor = "#444"; // Cor da parede se faltar imagem
        } else {
            img = Assets.floor;
            fallbackColor = "#1a3a1a"; // Cor do chão se faltar imagem
        }

        if (img && isLoaded(img)) {
            ctx.drawImage(img, x, y, CONFIG.TILE, CONFIG.TILE);
        } else {
            // Plano B do cenário
            ctx.fillStyle = fallbackColor;
            ctx.fillRect(x, y, CONFIG.TILE, CONFIG.TILE);
             if (type === 1) {
                 ctx.strokeStyle = "#222";
                 ctx.strokeRect(x, y, CONFIG.TILE, CONFIG.TILE);
             }
        }
    }
};