import Phaser from '../lib/phaser.js'

export default class gameover extends Phaser.Scene {

    constructor() {
        super('game-over')
    }

    preload() {
        // Loads the game over background
        this.load.image('gameoverscr', 'assets/images/game-assets/gameover-screen.webp');

    }

    create() {
        // The Game Over image
        this.add.image(0, 0, 'gameoverscr').setOrigin(0, 0);

        // Menu button becomes visible & Start button is hidden
        const startButton = document.querySelector('[data-type="start-btn"]');
        startButton.classList.add('hidden');

        const gameHtpButton = document.querySelector('[data-type="gameHtp-btn"]');
        gameHtpButton.classList.add('hidden');

        const gameMenuButton = document.querySelector('[data-type="gameMenu-btn"]');
        gameMenuButton.classList.remove('hidden');

        // Event listener for Game Menu button
        gameMenuButton.addEventListener('click', () => {
            console.log('Game Menu request detected')

            // Moves to gamemenu.js
            console.log('Loading Main Menu...')
            this.scene.start('game-menu');
        });

    }
}