// Import Phaser library
import Phaser from '../lib/phaser.js';

// Defines the game menu scene class
export default class GameMenu extends Phaser.Scene {

    // General Structure of "Alien Evader" Phaser Game was adapted from (https://blog.ourcade.co),
    // Written & Published by Tommy Leung.
    constructor() {
        super('game-menu');
        this.backgroundMusic = null;
        this.isMuted = true;
        this.background = null;
    }

    // Preloads game assets
    preload() {
        // Loads the images and audio files
        this.load.image('gamemenuscr', 'assets/images/game-assets/gamemenu-screen.webp');
        this.load.image('gamemenuscrtwo', 'assets/images/game-assets/gamemenu-mobile.webp');
        this.load.audio('backgroundMusic', 'assets/game-audio/game-background-sound.mp3');
    }

    // Creates game menu scene
    create() {
        // Obtains the device screen width
        const screenWidth = window.innerWidth;

        // Adds background image based on screen width
        if (screenWidth <= 560) {
            this.background = this.add.image(-55, 0, 'gamemenuscrtwo').setOrigin(0, 0);
            this.background.setScale(1);
        } else {
            this.background = this.add.image(0, 0, 'gamemenuscr').setOrigin(0, 0);
            this.background.setScale(1);
        }

        // Centers and scales background image
        this.scaleBackground();

        // Registers resize event handler
        this.scale.on('resize', this.scaleBackground, this);

        // Calls game menu elements method
        this.setupGameMenu();

        // Adds event listeners for play & how to play buttons
        const startButton = document.querySelector('[data-type="start-btn"]');
        this.addButtonEventListeners(startButton, 'game');

        const gameHtpButton = document.querySelector('[data-type="gameHtp-btn"]');
        this.addButtonEventListeners(gameHtpButton, 'game-htp');

        // Adds event listener for audio toggle button
        const muteButton = document.querySelector('[data-type="audioToggle"]');
        this.addAudioToggleEventListeners(muteButton);

        // Plays background music
        if (!this.backgroundMusic || !this.backgroundMusic.isPlaying) {
            this.backgroundMusic = this.sound.add('backgroundMusic', {
                loop: true,
                volume: 1,
                mute: true
            });
            this.backgroundMusic.play();
        }
    }

    // Sets up game menu elements
    setupGameMenu() {
        // Hide certain elements
        const elementsToHide = ['gameMenu-btn', 'gameRestart-btn', 'gameGoBack-btn', 'howtoplay-list', 'gameScore'];
        elementsToHide.forEach(element => {
            const el = document.querySelector(`[data-type="${element}"]`);
            if (el) {
                el.classList.add('hidden');
            }
        });

        // Show start and how to play buttons
        const startButton = document.querySelector('[data-type="start-btn"]');
        startButton.classList.remove('hidden');

        const gameHtpButton = document.querySelector('[data-type="gameHtp-btn"]');
        gameHtpButton.classList.remove('hidden');
    }
    
    // Scales and center background image
    scaleBackground() {
        if (!this.background) return;
        const { width, height } = this.scale;
        const scaleX = width / this.background.width;
        const scaleY = height / this.background.height;
        const scale = Math.max(scaleX, scaleY);
        this.background.setScale(scale).setOrigin(0.5);
        this.background.x = width / 2;
        this.background.y = height / 2;
    }

    // Add event listeners for buttons
addButtonEventListeners(button, sceneKey) {
    button.addEventListener('click', () => {
        this.scene.start(sceneKey);
    });
    button.addEventListener('touchstart', (event) => {
        event.preventDefault();
        this.scene.start(sceneKey);
    });
}


    // Add event listeners for audio toggle button
addAudioToggleEventListeners(button) {
    button.addEventListener('click', () => {
        this.toggleAudio();
    });
    button.addEventListener('touchstart', (event) => {
        event.preventDefault();
        this.toggleAudio();
    });
}

    // Toggles audio mute
    toggleAudio() {
        this.isMuted = !this.isMuted;
        this.backgroundMusic.setMute(this.isMuted);

        // Toggles visibility of mute buttons
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