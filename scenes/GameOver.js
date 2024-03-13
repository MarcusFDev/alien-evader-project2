import Phaser from '../lib/phaser.js'

export default class GameOver extends Phaser.Scene {

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

        const gameMenuButton = document.querySelector('[data-type="gameMenu-btn"] .gameMenu-btn');
        gameMenuButton.classList.remove('hidden');

        // Add event listener to the button
        const menuButton = document.querySelector('[data-type="gameMenu-btn"]');
        menuButton.addEventListener('click', () => {
            this.startGame();
            console.log('Detected Main Menu request');
        });
    }

    startGame() {
        console.log('Sending to Main Menu')
    }

}