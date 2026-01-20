// js/assets.js

// Objeto que guardará as imagens carregadas
const Assets = {
    floor: new Image(),
    wall: new Image(),
    warrior: new Image(),
    mage: new Image(),
    arrow: new Image(),
    // Adicione mais aqui depois (inimigos, itens, etc.)
};

// Define os caminhos dos arquivos
Assets.floor.src = 'assets/floor.png';
Assets.wall.src = 'assets/wall.png';
Assets.warrior.src = 'assets/warrior.png';
Assets.mage.src = 'assets/mage.png';
Assets.arrow.src = 'assets/arrow.png';

// Função para verificar se uma imagem já carregou
// Útil para evitar desenhar algo que ainda não existe
function isLoaded(img) {
    return img.complete && img.naturalHeight !== 0;
}

console.log("Sistema de Assets iniciado. Carregando imagens...");