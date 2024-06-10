// Import Phaser library
import Phaser from '../lib/phaser.js';

// Defines the Game scene class
export default class game extends Phaser.Scene {

    /** @type {Phaser.Physics.Arcade.Sprite} */
    player;

    score = 0;
    scoreText;
    cursors;
    speedMultiplier = 1;

    // General Structure of "Alien Evader" Phaser Game was adapted from (https://blog.ourcade.co),
    // Written & Published by Tommy Leung.
    constructor() {
        super('game');
    }

    // Preloads game assets
    preload() {
        // Loads the game canvas background
        this.load.image('skyline', 'assets/images/game-assets/game-background.webp');

        // Loads the city building platforms
        this.load.image('building1', 'assets/images/game-assets/city-building1.webp');
        this.load.image('building2', 'assets/images/game-assets/city-building2.webp');
        this.load.image('building3', 'assets/images/game-assets/city-building3.webp');
        this.load.image('building4', 'assets/images/game-assets/city-building4.webp');
        this.load.image('building5', 'assets/images/game-assets/city-building5.webp');
        this.load.image('building6', 'assets/images/game-assets/city-building6.webp');
        this.load.image('building7', 'assets/images/game-assets/city-building7.webp');
    
        // Loads the alien ship
        this.load.image('alienship', 'assets/images/game-assets/alienship.webp');

        // Loads the player character
        this.load.image('alien', 'assets/images/game-assets/player-model.webp');

        // Loads Touchscreen arrows
        this.load.image('jumpButton', 'assets/images/game-assets/up-arrowkey.webp');
        this.load.image('leftButton', 'assets/images/game-assets/left-arrowkey.webp');
        this.load.image('rightButton', 'assets/images/game-assets/right-arrowkey.webp');

        // Loads the game background music
        this.load.audio('backgroundMusic', 'assets/game-audio/game-background-sound.mp3');
    }

    // Creates game how to play scene
    create() {
        // Calls to Hide UI elements
        this.hideUIElements();

        // Calls to Show score element
        this.showScore();

        // Checks user screen size
        const screenWidth = this.scale.width;
        const screenHeight = this.scale.height;
        const isSmallScreen = screenWidth <= 560;

        // Defines scale of game sprites
        const backgroundScale = isSmallScreen ? 0.7 : 1;
        const alienShipScale = isSmallScreen ? 0.3 : 0.5;
        const platformScale = isSmallScreen ? 0.3 : 0.4;
        const playerScale = isSmallScreen ? 0.09 : 0.1;

        // Calls to Add canvas background
        this.addBackground(screenWidth, screenHeight, backgroundScale);

        // Calls to Add alien ship
        this.addAlienShip(alienShipScale, isSmallScreen);

        // Calls to Create building platforms
        this.createPlatforms(platformScale, isSmallScreen);

        // Calls to Create player
        this.createPlayer(screenWidth, screenHeight, playerScale);

        // Calls to Set up player camera
        this.setupCamera();

        // Calls to Set up user control
        this.setupControls(screenWidth, isSmallScreen);

        // Calls to Set up speed multiplier
        this.setupSpeedMultiplier();

        // Calls to Set up audio toggle
        this.setupAudioToggle();

        // Add background music
        this.backgroundMusic = this.sound.add('backgroundMusic', { loop: true });
        this.backgroundMusic.play();
    }

    // Hides All HTML Buttons
    hideUIElements() {
        const elementsToHide = ['start-btn', 'gameMenu-btn', 'gameHtp-btn', 'gameRestart-btn', 'gameGoBack-btn', 'howtoplay-list'];
        elementsToHide.forEach(element => {
            const el = document.querySelector(`[data-type="${element}"]`);
            el.classList.add('hidden');
        });
    }

    // Shows Game Score Div
    showScore() {
        const gameScoring = document.querySelector('[data-type="gameScore"]');
        gameScoring.classList.remove('hidden', 'gameOverScore');
    }

    // Sets up Canvas Background position
    addBackground(screenWidth, screenHeight, scale) {
        const background = this.add.image(screenWidth / 2, screenHeight / 2, 'skyline').setOrigin(0.5);
        background.setScale(scale);
    }

    // Sets up Alien Ship sprite position
    addAlienShip(scale, isSmallScreen) {
        const x = isSmallScreen ? -145 : -200;
        const alienShip = this.add.image(x, 0, 'alienship').setOrigin(0, 0);
        alienShip.setScale(scale);
        alienShip.setDepth(1);
    }

    // Sets up Building Platform properties
    createPlatforms(scale, isSmallScreen) {
        const platforms = this.physics.add.group({
            allowGravity: false,
            immovable: true,
            velocityX: -200,
        });

        // Generates platform spawning positions
        const screenHeight = this.scale.height;
        const minYPosition = screenHeight + 0.02;
        const platformXIncrement = isSmallScreen ? 600 : 800;
        const platformImages = ['building1', 'building2', 'building3', 'building4', 'building5', 'building6', 'building7'];

        for (let i = 0; i < 999; ++i) {
            const x = platformXIncrement * i;
            const y = isSmallScreen ? Phaser.Math.Between(minYPosition, screenHeight + 0.2) : Phaser.Math.Between(750, 1050);

            // Generates random platform images
            const randomImage = Phaser.Math.RND.pick(platformImages);
            const platform = platforms.create(x, y, randomImage).setScale(scale);
            this.physics.world.enable(platform);
            platform.body.allowGravity = false;
            platform.body.immovable = true;
        }

        this.platforms = platforms;
    }

    // Generates Player position
    createPlayer(screenWidth, screenHeight, scale) {
        const initialPlayerX = screenWidth / 3;
        const initialPlayerY = screenHeight * 0.2;
        this.player = this.physics.add.sprite(initialPlayerX, initialPlayerY, 'alien').setScale(scale);

        // Creates Player character properties
        this.player.body.setSize(this.player.width * 0.8, this.player.height * 0.7);
        this.player.body.setOffset(this.player.width * 0.1, this.player.height * 0.1);
        this.player.body.setGravityY(500);
        this.player.setBounce(0.2);

        // Establishes collision with platforms
        this.physics.add.collider(this.platforms, this.player, () => {
            this.isOnGround = true;
        });
    }

    // Sets up Player Camera properties
    setupCamera() {
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, this.scale.width, this.scale.height);
    }

    // Sets up Player control properties
    setupControls(screenWidth) {
        const playerSpeed = 100;
        const jumpHeight = 500;
        this.isOnGround = true;

        // Determines to use Touch Control or Keyboard control based on screen size
        if (screenWidth <= 800) {
            this.setupTouchscreenControls(playerSpeed, jumpHeight);
        } else {
            this.setupKeyboardControls(playerSpeed, jumpHeight);
        }
    }

    // Sets up Touch control settings
    setupTouchscreenControls(playerSpeed, jumpHeight) {
        const buttonOffsetX = 40;
        const buttonOffsetY = 465;

        // Adds Left Touch button to screen.
        const leftButton = this.add.image(buttonOffsetX, buttonOffsetY, 'leftButton').setInteractive();
        leftButton.setScale(0.15);

        // Adds Right Touch button to screen.
        const rightButton = this.add.image(this.scale.width - buttonOffsetX, buttonOffsetY, 'rightButton').setInteractive();
        rightButton.setScale(0.15);

        // Detects touch input for Left button and calculates movement
        leftButton.on('pointerdown', () => {
            this.player.setVelocityX(-playerSpeed * this.speedMultiplier);
        });
        // Detects end of touch input for Left button and stops movement
        leftButton.on('pointerup', () => {
            this.player.setVelocityX(0);
        });

        // Detects touch input for Right button and calculates movement
        rightButton.on('pointerdown', () => {
            this.player.setVelocityX(playerSpeed * this.speedMultiplier);
        });
        // Detects end of touch input for Right button and stops movement
        rightButton.on('pointerup', () => {
            this.player.setVelocityX(0);
        });

        // Detects touch input for jumping on screen & not on Left & Right buttons.
        this.input.on('pointerdown', (pointer) => {
            const isOverButton = leftButton.getBounds().contains(pointer.x, pointer.y) ||
                rightButton.getBounds().contains(pointer.x, pointer.y);
            if (!isOverButton && this.isOnGround) {
                this.player.setVelocityY(-jumpHeight);
                this.isOnGround = false;
            }
        });
    }

    // Sets up Keyboard control settings & keymap
    setupKeyboardControls(playerSpeed, jumpHeight) {
        const cursors = this.input.keyboard.createCursorKeys();
        const keyMap = {
            'LEFT': ['A', 'LEFT'],
            'RIGHT': ['D', 'RIGHT']
        };

        Object.keys(keyMap).forEach(direction => {
            const keys = keyMap[direction];
            keys.forEach(key => {
                // Detects user key input and calculates player movement
                this.input.keyboard.on(`keydown-${key}`, () => {
                    const velocityX = direction === 'LEFT' ? -playerSpeed : playerSpeed;
                    this.player.setVelocityX(velocityX * this.speedMultiplier);
                });
                // Detects end of key input and ends player movement
                this.input.keyboard.on(`keyup-${key}`, () => {
                    const oppositeKeys = keyMap[direction];
                    const oppositeKeyDown = oppositeKeys.some(k => cursors[k] && cursors[k].isDown);
                    if (!oppositeKeyDown) {
                        this.player.setVelocityX(0);
                    }
                });
            });
        });

        // Detects spacebar input and checks if has collision with platform
        this.input.keyboard.on('keydown-SPACE', () => {
            if (this.isOnGround) {
                this.player.setVelocityY(-jumpHeight);
                this.isOnGround = false;
            }
        });
    }

    // Sets up Game Speed multiplier for platform spawning
    setupSpeedMultiplier() {
        this.time.addEvent({
            delay: 15000,
            loop: true,
            callback: () => {
                this.speedMultiplier += 0.2;
                this.platforms.children.iterate((platform) => {
                    platform.body.velocity.x = -200 * this.speedMultiplier;
                });
            },
        });
    }

    // Sets up Audio Toggle button
    setupAudioToggle() {
        const audioToggleBtn = document.querySelector('[data-type="audioToggle"]');
        audioToggleBtn.addEventListener('click', () => {
            if (this.backgroundMusic.isPlaying) {
                this.backgroundMusic.pause();
            } else {
                this.backgroundMusic.resume();
            }
    
            // Toggles the Audio to show Mute or unMute button
            const audioOnBtn = document.getElementById("audioOnBtn");
            const audioOffBtn = document.getElementById("audioOffBtn");
            if (this.backgroundMusic.isPlaying) {
                audioOffBtn.classList.add("hidden");
                audioOnBtn.classList.remove("hidden");
            } else {
                audioOnBtn.classList.add('hidden');
                audioOffBtn.classList.remove('hidden');
            }
        });
    }    

    // Sets up built in Phaser method which updates scene
    update() {
        // Calculates user score while game scene is running
        if (this.player) {
            const incrementValue = 0.01;
            this.score += incrementValue;
            document.getElementById('score').textContent = Math.floor(this.score);

            if (this.player.y > this.game.config.height || this.player.x < 0) {
                this.gameOver();
            }
        }
    }

    // Sets up game scene switch to gameOver scene
    gameOver() {
        // Stop background music
        if (this.backgroundMusic) {
            this.backgroundMusic.stop();
        }
        // Stops physics and player movement
        this.physics.pause();
        this.player.setVelocity(0, 0);
        this.scene.start('game-over');
    }

    // Sets up game scene switch to gameOverTwo scene
    gameOverTwo() {
        // Stop background music
        if (this.backgroundMusic) {
            this.backgroundMusic.stop();
        }
        // Stops physics and player movement
        this.physics.pause();
        this.player.setVelocity(0, 0);
        this.scene.start('game-over-two');
    }
}