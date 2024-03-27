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

            //const gameScoring = document.querySelector('[data-type="gameScore"]');
            //gameScoring.classList.remove('hidden')

            const gameMenuButton = document.querySelector('[data-type="gameMenu-btn"]');
            gameMenuButton.classList.remove('hidden');

            const gameRestartButton = document.querySelector('[data-type="gameRestart-btn"]');
            gameRestartButton.classList.remove('hidden');

            // Find the gameScore element
            const gameScoreElement = document.querySelector('[data-type="gameScore"]');

            // Remove the 'hidden' class and add the 'gameOverScore' class
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