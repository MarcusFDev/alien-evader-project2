import Phaser from '../lib/phaser.js'

export default class gamemenu extends Phaser.Scene {

    constructor() {
        super('game-menu')

        this.backgroundMusic = null;

        this.isMuted = true;
    }

    preload() {
        // Loads the game start background
        this.load.image('gamemenuscr', 'assets/images/game-assets/gamemenu-screen.webp');

        this.load.audio('backgroundMusic', 'assets/game-audio/game-background-sound.mp3');

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

        // Score Div hidden on this scene

        const gameScoring = document.querySelector('[data-type="gameScore"]');
        gameScoring.classList.add('hidden')

        this.addButtonClickListener(startButton, 'game');
        this.addButtonClickListener(gameHtpButton, 'game-htp');

        // User Toggle Audio functionality
        const muteButton = document.querySelector('[data-type="audioToggle"]');
        muteButton.addEventListener('click', () => {
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
        });

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

    addButtonClickListener(button, sceneKey) {
        button.addEventListener('click', () => {
            this.scene.start(sceneKey);
        });
    }
}