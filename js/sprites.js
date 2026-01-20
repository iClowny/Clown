const Sprites = {
    drawPlayer(ctx, x, y, color) {
        // Desenha o Palhaço
        ctx.fillStyle = color;
        ctx.fillRect(x + 8, y + 8, 16, 16); // Corpo
        ctx.fillStyle = "white";
        ctx.fillRect(x + 10, y + 10, 12, 10); // Rosto
        ctx.fillStyle = "red";
        ctx.beginPath(); ctx.arc(x + 16, y + 16, 3, 0, Math.PI * 2); ctx.fill(); // Nariz
    },
    drawTile(ctx, x, y, type) {
        if (type === 1) {
            ctx.fillStyle = "#444"; // Parede
            ctx.fillRect(x, y, 32, 32);
            ctx.strokeStyle = "#222";
            ctx.strokeRect(x, y, 32, 32);
        } else {
            ctx.fillStyle = "#1a3a1a"; // Chão
            ctx.fillRect(x, y, 32, 32);
        }
    }
};