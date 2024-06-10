// Import Phaser library
import Phaser from '../lib/phaser.js';

// Defines the GameHowtoPlay scene class
export default class gameovertwo extends Phaser.Scene {

    // General Structure of "Alien Evader" Phaser Game was adapted from (https://blog.ourcade.co),
    // Written & Published by Tommy Leung.
    constructor() {
        super('game-over-two');
    }

    // Preloads game assets
    preload() {
        // Loads the game over background
        this.load.image('gameovertwoscr', 'assets/images/game-assets/gameovertwo-screen.webp');
        this.load.image('gameovertwoscrmobile', 'assets/images/game-assets/gameovertwo-mobile.webp');
    }

    // Creates game over two scene
    create() {
        const screenWidth = window.innerWidth;

        // Add the appropriate background image based on screen width
        if (screenWidth <= 560) {
            this.background = this.add.image(-55, 0, 'gameovertwoscrmobile').setOrigin(0, 0);
        } else {
            this.background = this.add.image(0, 0, 'gameovertwoscr').setOrigin(0, 0);
        }

        // Center and scale the background image
        this.scaleBackground();

        // Register resize event handler
        this.scale.on('resize', this.scaleBackground, this);

        // Hide unnecessary buttons and elements
        this.setupGameOverTwo();

        // Add button event listeners
        this.addButtonEventListeners('gameMenu-btn', 'game-menu');
        this.addButtonEventListeners('gameRestart-btn', 'game');

        // Audio button toggle
        this.setupAudioToggle();
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

    // Sets up game over two scene elements
    setupGameOverTwo() {
        // Hide elements that are not needed on the game over two screen
        const elementsToHide = ['start-btn', 'gameHtp-btn', 'gameGoBack-btn'];
        elementsToHide.forEach(element => {
            const el = document.querySelector(`[data-type="${element}"]`);
            if (el) {
                el.classList.add('hidden');
            }
        });

        // Shows the game menu button
        const gameMenuButton = document.querySelector('[data-type="gameMenu-btn"]');
        if (gameMenuButton) {
            gameMenuButton.classList.remove('hidden');
        }
        // Shows the game restart button
        const gameRestartButton = document.querySelector('[data-type="gameRestart-btn"]');
        if (gameRestartButton) {
            gameRestartButton.classList.remove('hidden');
        }
        // Apply Game Over Score styling
        const gameScore = document.querySelector('[data-type="gameScore"]');
        gameScore.classList.add('gameOverScore');
    }

    addButtonEventListeners(buttonType, sceneKey) {
        // Select the button using the data-type attribute
        const button = document.querySelector(`[data-type="${buttonType}"]`);
    
        if (button) {
            // Defines the event handler to reset the score and start a new scene
            const eventHandler = () => {
                // Resets the score in the 'game' scene
                this.scene.get('game').events.emit('resetScore');
                // Starts the scene
                this.scene.start(sceneKey);
            };
            // Adds event listener for mouse clicks
            button.addEventListener('click', eventHandler);
            // Adds touchstart event listener for touch input
            button.addEventListener('touchstart', (event) => {
                event.preventDefault(); // Prevents the default touch behavior
                eventHandler();
            }, { passive: true }); // Make the event listener passive
        }
    }

    setupAudioToggle() {
        // Selects the audio toggle buttons
        const audioOnBtn = document.getElementById("audioOnBtn");
        const audioOffBtn = document.getElementById("audioOffBtn");
    
        if (audioOnBtn && audioOffBtn) {
            // Adds event listener to the "audio on" button
            audioOnBtn.addEventListener("click", () => {
                // Hides the "audio on" button and show the "audio off" button
                audioOnBtn.classList.add("hidden");
                audioOffBtn.classList.remove("hidden");
            });
    
            // Adds event listener to the "audio off" button
            audioOffBtn.addEventListener("click", () => {
                // Hides the "audio off" button and show the "audio on" button
                audioOffBtn.classList.add("hidden");
                audioOnBtn.classList.remove("hidden");
            });
        }
    }   
}