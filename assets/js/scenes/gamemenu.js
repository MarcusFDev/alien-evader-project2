import Phaser from '../lib/phaser.js';

export default class gamemenu extends Phaser.Scene {
    constructor() {
        super('game-menu');
        this.backgroundMusic = null;
        this.isMuted = true;
        this.background = null;
    }

    preload() {
        this.load.image('gamemenuscr', 'assets/images/game-assets/gamemenu-screen.webp');
        this.load.image('gamemenuscrtwo', 'assets/images/game-assets/gamemenu-mobile.webp');
        this.load.audio('backgroundMusic', 'assets/game-audio/game-background-sound.mp3');
    }

    create() {
        const screenWidth = window.innerWidth;

        if (screenWidth <= 560) {

            this.background = this.add.image(-55, 0, 'gamemenuscrtwo').setOrigin(0, 0);
            this.background.setScale(1);

        } else {
            // The Game Menu image
            this.background = this.add.image(0, 0, 'gamemenuscr').setOrigin(0, 0);
            this.background.setScale(1);
        }

        // Center the background initially
        this.scaleBackground();

        // Registers resize event to handle window resizing
        this.scale.on('resize', this.scaleBackground, this);

        // Sets up buttons and hides selected elements
        this.setupGameMenu();

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

    setupGameMenu() {
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
    
    scaleBackground() {
        if (!this.background) return; // Check if background is initialized
        const { width, height } = this.scale;
        const scaleX = width / this.background.width;
        const scaleY = height / this.background.height;
        const scale = Math.max(scaleX, scaleY);

        this.background.setScale(scale).setOrigin(0.5);

        // Center the background
        this.background.x = width / 2;
        this.background.y = height / 2;
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
        }, { passive: true }); // Setting touch event listener to passive
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
        }, { passive: true }); // Setting touch event listener to passive
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