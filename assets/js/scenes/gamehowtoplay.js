import Phaser from '../lib/phaser.js'

export default class gamehowtoplay extends Phaser.Scene {

    constructor() {
        super('game-htp')
    }

    preload() {
        // Loads the game over background
        this.load.image('gamehtpscr', 'assets/images/game-assets/howtoplay-scene-img.webp');

    }

    create() {
        // The Game Over image
        this.add.image(0, 0, 'gamehtpscr').setOrigin(0, 0);

        // Menu button becomes visible & Start button is hidden
        const startButton = document.querySelector('[data-type="start-btn"]');
        startButton.classList.add('hidden');

        const gameHtpButton = document.querySelector('[data-type="gameHtp-btn"]');
        gameHtpButton.classList.add('hidden');

        const gameRestartButton = document.querySelector('[data-type="gameRestart-btn"]');
        gameRestartButton.classList.add('hidden');

        const gameMenuButton = document.querySelector('[data-type="gameMenu-btn"]');
        gameMenuButton.classList.add('hidden');

        const gameGoBackButton = document.querySelector('[data-type="gameGoBack-btn"]');
        gameGoBackButton.classList.remove('hidden');

        const howToPlayDiv = document.querySelector('[data-type="howtoplay-list"]');
        howToPlayDiv.classList.remove('hidden');

        // Score Div hidden on this scene

        const gameScoring = document.querySelector('[data-type="gameScore"]');
        gameScoring.classList.add('hidden')

        // Event listener for Go Back button
        gameGoBackButton.addEventListener('click', () => {
            console.log('Game Menu request detected')

            // Moves to gamemenu.js
            console.log('Loading Main Menu...')
            this.scene.start('game-menu');
        });

    }
}