import Phaser from '../lib/phaser.js'

export default class gamemenu extends Phaser.Scene {

    constructor() {
        super('game-menu')
    }

    preload() {
        // Loads the game start background
        this.load.image('gamemenuscr', 'assets/images/game-assets/gamemenu-screen.webp');

    }

    create() {
        // The Game Menu image
        this.add.image(0, 0, 'gamemenuscr').setOrigin(0, 0);

        // Start button becomes visible & Menu button is hidden
        const startButton = document.querySelector('[data-type="start-btn"]');
        startButton.classList.remove('hidden');

        const gameMenuButton = document.querySelector('[data-type="gameMenu-btn"]');
        gameMenuButton.classList.add('hidden');

        // Event listener for Start button
        startButton.addEventListener('click', () => {
        
            // Moves to game.js
            this.scene.start('game');
        });
    }
}