import Phaser from '../lib/phaser.js'

export default class gameovertwo extends Phaser.Scene {

    constructor() {
        super('game-over-two')
    }

    preload() {
        // Loads the game over background
        this.load.image('gameovertwoscr', 'assets/images/game-assets/gamemenu-screen.webp');

    }

    create() {
        // The Game Over image
        this.add.image(0, 0, 'gameovertwoscr').setOrigin(0, 0);

        // Menu button becomes visible & Start button is hidden
        const startButton = document.querySelector('[data-type="start-btn"]');
        startButton.classList.add('hidden');

        const gameHtpButton = document.querySelector('[data-type="gameHtp-btn"]');
        gameHtpButton.classList.add('hidden');

        const gameGoBackButton = document.querySelector('[data-type="gameGoBack-btn"]');
        gameGoBackButton.classList.add('hidden');

        const howToPlayDiv = document.querySelector('[data-type="howtoplay-list"]');
        howToPlayDiv.classList.add('hidden');

        const gameMenuButton = document.querySelector('[data-type="gameMenu-btn"]');
        gameMenuButton.classList.remove('hidden');

        const gameRestartButton = document.querySelector('[data-type="gameRestart-btn"]');
        gameRestartButton.classList.remove('hidden');

        // Event listener for Game Menu button
        const addButtonClickListener = (button, sceneKey) => {
            button.addEventListener('click', () => {
                this.scene.start(sceneKey);
            });
        }

        addButtonClickListener(gameMenuButton, 'game-menu');
        addButtonClickListener(gameRestartButton, 'game');

    }
}