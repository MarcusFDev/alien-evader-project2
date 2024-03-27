import Phaser from '../lib/phaser.js'

export default class gameovertwo extends Phaser.Scene {

    constructor() {
        super('game-over-two')
    }

    preload() {
        // Loads the game over background
        this.load.image('gameovertwoscr', 'assets/images/game-assets/gameovertwo-screen.webp');

    }

    create() {
        // The Game Over image
        this.add.image(0, 0, 'gameovertwoscr').setOrigin(0, 0);

        const screenWidth = window.innerWidth;

        if (screenWidth <= 425) {
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

            const gameScoreElement = document.querySelector('[data-type="gameScore"]');

            gameScoreElement.classList.remove('hidden');
            gameScoreElement.classList.add('gameOverScore');

        } else {
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

            const gameScoreElement = document.querySelector('[data-type="gameScore"]');

            gameScoreElement.classList.remove('hidden');
            gameScoreElement.classList.add('gameOverScore');
        }

        const addButtonClickListener = (button, sceneKey) => {
            button.addEventListener('click', () => {
                this.scene.get('game').events.emit('resetScore');
                this.scene.start(sceneKey);
            });

            button.addEventListener('touchstart', (event) => {
                event.preventDefault();
                this.scene.get('game').events.emit('resetScore');
                this.scene.start(sceneKey);
            });
        }

        const gameMenuButton = document.querySelector('[data-type="gameMenu-btn"]');
        addButtonClickListener(gameMenuButton, 'game-menu');

        const gameRestartButton = document.querySelector('[data-type="gameRestart-btn"]');
        addButtonClickListener(gameRestartButton, 'game');

        const audioOnBtn = document.getElementById("audioOnBtn");
        const audioOffBtn = document.getElementById("audioOffBtn");

        audioOnBtn.addEventListener("click", function () {
            audioOnBtn.classList.add("hidden");
            audioOffBtn.classList.remove("hidden");
        });

        audioOffBtn.addEventListener("click", function () {
            audioOffBtn.classList.add("hidden");
            audioOnBtn.classList.remove("hidden");
        });
    }
}