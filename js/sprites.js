const Sprites = {
    drawPlayer(ctx, x, y, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x + 4, y + 4, 24, 24); // Corpo
        ctx.fillStyle = "white";
        ctx.fillRect(x + 8, y + 8, 16, 12); // Rosto
        ctx.fillStyle = "red";
        ctx.beginPath(); ctx.arc(x + 16, y + 16, 4, 0, Math.PI * 2); ctx.fill(); // Nariz
    },
    drawTile(ctx, x, y, type) {
        ctx.fillStyle = type === 1 ? "#444" : "#1a3a1a";
        ctx.fillRect(x, y, CONFIG.TILE_SIZE, CONFIG.TILE_SIZE);
        ctx.strokeStyle = "rgba(0,0,0,0.1)";
        ctx.strokeRect(x, y, CONFIG.TILE_SIZE, CONFIG.TILE_SIZE);
    }
};