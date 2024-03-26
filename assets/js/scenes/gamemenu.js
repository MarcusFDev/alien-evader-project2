import Phaser from '../lib/phaser.js';

export default class gamemenu extends Phaser.Scene {
    constructor() {
        super('game-menu');

        this.backgroundMusic = null;
        this.isMuted = true;
    }

    preload() {
        this.load.image('gamemenuscr', 'assets/images/game-assets/gamemenu-screen.webp');
        this.load.image('gamemenuscrtwo', 'assets/images/game-assets/gamemenu-mobile.webp');
        this.load.audio('backgroundMusic', 'assets/game-audio/game-background-sound.mp3');
    }

    create() {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        if (window.innerWidth <= 425) {

            const background = this.add.image(screenWidth / 2, screenHeight / 2, 'gamemenuscrtwo').setOrigin(0.5);

            const scaleFactor = 0.1;
            background.setScale(scaleFactor);

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

            const gameScoring = document.querySelector('[data-type="gameScore"]');
            gameScoring.classList.add('hidden');
        } else {
            // The Game Menu image
            this.add.image(0, 0, 'gamemenuscr').setOrigin(0, 0);

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

            const gameScoring = document.querySelector('[data-type="gameScore"]');
            gameScoring.classList.add('hidden');
        }


        // Button Event listeners for scene changes
        const startButton = document.querySelector('[data-type="start-btn"]');
        this.addButtonEventListeners(startButton, 'game');

        const gameHtpButton = document.querySelector('[data-type="gameHtp-btn"]');
        this.addButtonEventListeners(gameHtpButton, 'game-htp');

        // User Toggle Audio functionality
        const muteButton = document.querySelector('[data-type="audioToggle"]');
        this.addAudioToggleEventListeners(muteButton);

        // Begins to play background music
        if (!this.backgroundMusic || !this.backgroundMusic.isPlaying) {
            this.backgroundMusic = this.sound.add('backgroundMusic', {
                loop: true,
                volume: 1,
                mute: true
            });
            this.backgroundMusic.play();
        }
    }

    addButtonEventListeners(button, sceneKey) {
        // Click event listener for mouse devices
        button.addEventListener('click', () => {
            this.scene.start(sceneKey);
        });

        // Touch event listener for touchscreens devices
        button.addEventListener('touchstart', (event) => {
            event.preventDefault();

            this.scene.start(sceneKey);
        });
    }

    addAudioToggleEventListeners(button) {
        // Click event listener for mouse devices
        button.addEventListener('click', () => {
            this.toggleAudio();
        });

        // Touch event listener for touchscreens devices
        button.addEventListener('touchstart', (event) => {
            event.preventDefault();
            this.toggleAudio();
        });
    }

    toggleAudio() {
        this.isMuted = !this.isMuted;
        this.backgroundMusic.setMute(this.isMuted);

        // Toggle visibility of mute buttons
        const audioOnBtn = document.getElementById("audioOnBtn");
        const audioOffBtn = document.getElementById("audioOffBtn");
        if (this.isMuted) {
            audioOnBtn.classList.add("hidden");
            audioOffBtn.classList.remove("hidden");
        } else {
            audioOffBtn.classList.add("hidden");
            audioOnBtn.classList.remove("hidden");
        }
    }
}