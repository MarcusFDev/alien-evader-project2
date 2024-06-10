// Import Phaser library
import Phaser from '../lib/phaser.js';

// Defines the GameHowtoPlay scene class
export default class GameHowToPlay extends Phaser.Scene {

    // General Structure of "Alien Evader" Phaser Game was adapted from (https://blog.ourcade.co),
    // Written & Published by Tommy Leung.
    constructor() {
        super('game-htp');
    }

    // Preloads game assets
    preload() {
        this.load.image('gamehtpscr', 'assets/images/game-assets/howtoplay-scene-img.webp');
        this.load.image('gamehtpscrtwo', 'assets/images/game-assets/howtoplaymobile.webp');
    }

    // Creates game how to play scene
    create() {
        // Obtains the device screen width
        const screenWidth = window.innerWidth;

        // Adds background image based on screen width
        if (screenWidth <= 560) {
            this.background = this.add.image(-55, 0, 'gamehtpscrtwo').setOrigin(0, 0);
            this.background.setScale(1);
        } else {
            this.background = this.add.image(0, 0, 'gamehtpscr').setOrigin(0, 0);
            this.background.setScale(1);
        }

        // Centers and scales background image
        this.scaleBackground();

        // Registers resize event handler
        this.scale.on('resize', this.scaleBackground, this);

        // Hide unnecessary buttons and elements
        this.setupHowToPlay();

        // Show the "Go Back" button and How to Play content
        const gameGoBackButton = document.querySelector('[data-type="gameGoBack-btn"]');
        gameGoBackButton.classList.remove('hidden');

        const howToPlayDiv = document.querySelector('[data-type="howtoplay-list"]');
        howToPlayDiv.classList.remove('hidden');

        // Event listener for Go Back button
        gameGoBackButton.addEventListener('click', () => {
            this.goBackToMenu();
        });
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
    // Sets up how to play scene elements
    setupHowToPlay() {
        const elementsToHide = ['start-btn', 'gameHtp-btn', 'gameMenu-btn', 'gameRestart-btn', 'gameScore'];
        elementsToHide.forEach(element => {
            const el = document.querySelector(`[data-type="${element}"]`);
            if (el) {
                el.classList.add('hidden');
            }
        });
    }
    // Goes back to Main Menu when called
    goBackToMenu() {
        console.log('Game Menu request detected');
        console.log('Loading Main Menu...');
        this.scene.start('game-menu');
    }
}