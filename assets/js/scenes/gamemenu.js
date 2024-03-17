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

        const gameHtpButton = document.querySelector('[data-type="gameHtp-btn"]');
        gameHtpButton.classList.remove('hidden');

        const gameMenuButton = document.querySelector('[data-type="gameMenu-btn"]');
        gameMenuButton.classList.add('hidden');

        const gameRestartButton = document.querySelector('[data-type="gameRestart-btn"]');
        gameRestartButton.classList.add('hidden');

        const gameGoBackButton = document.querySelector('[data-type="gameGoBack-btn"]');
        gameGoBackButton.classList.add('hidden');

        const howToPlayDiv = document.querySelector('[data-type="howtoplay-list"]');
        howToPlayDiv.classList.add('hidden');

        // Event listener for user clicks on both the Start & How to Play button
        const addButtonClickListener = (button, sceneKey) => {
            button.addEventListener('click', () => {
                this.scene.start(sceneKey);
            });
        }

        addButtonClickListener(startButton, 'game');
        addButtonClickListener(gameHtpButton, 'game-htp');
    }
}