import Phaser from '../lib/phaser.js'

export default class game extends Phaser.Scene {

    /** @type {Phaser.Physics.Arcade.Sprite} */
    player;

    score = 0;
    scoreText;

    cursors

    constructor() {
        super('game')
    }

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
        this.load.image('alienship', 'assets/images/game-assets/alienship.webp')

        // Loads the player character
        this.load.image('alien', 'assets/images/game-assets/player-model.webp');

        // Loads Touchscreen arrows
        this.load.image('jumpButton', 'assets/images/game-assets/up-arrowkey.webp');
        this.load.image('leftButton', 'assets/images/game-assets/left-arrowkey.webp');
        this.load.image('rightButton', 'assets/images/game-assets/right-arrowkey.webp');
    }

    create() {

        // Hides Start & Menu buttons
        const startButton = document.querySelector('[data-type="start-btn"]');
        startButton.classList.add('hidden');

        const gameMenuButton = document.querySelector('[data-type="gameMenu-btn"]');
        gameMenuButton.classList.add('hidden');

        const gameHtpButton = document.querySelector('[data-type="gameHtp-btn"]');
        gameHtpButton.classList.add('hidden');

        const gameRestartButton = document.querySelector('[data-type="gameRestart-btn"]');
        gameRestartButton.classList.add('hidden');

        const gameGoBackButton = document.querySelector('[data-type="gameGoBack-btn"]');
        gameGoBackButton.classList.add('hidden');

        const howToPlayDiv = document.querySelector('[data-type="howtoplay-list"]');
        howToPlayDiv.classList.add('hidden');

        // Score Div shown on this scene

        const gameScoring = document.querySelector('[data-type="gameScore"]');
        gameScoring.classList.remove('hidden')
        gameScoring.classList.remove('gameOverScore');

        // Adds the background image
        this.add.image(0, 0, 'skyline').setOrigin(0, 0);

        // Adds the Alien spaceship image
        const alienShip = this.add.image(-200, 0, 'alienship').setOrigin(0, 0);
        alienShip.setScale(0.5);

        alienShip.setDepth(1);

        // Creates an array of building platform images
        const platformImages = ['building1', 'building2', 'building3', 'building4', 'building5', 'building6', 'building7']; // Array for easy implementation of new images

        // Creates the platforms group
        const platforms = this.physics.add.group({
            allowGravity: false,
            immovable: true,
            velocityX: -200, // Initial speed of platforms
        });

        // Creates game loop for platforms
        for (let i = 0; i < 999; ++i) {
            const x = 800 * i; // Distance between buildings
            const y = Phaser.Math.Between(750, 1050); // Randomized height of buildings

            // Randomly select a platform image from array
            const randomImage = Phaser.Math.RND.pick(platformImages);

            const platform = platforms.create(x, y, randomImage).setScale(0.4);

            // Enables physics for the platforms
            this.physics.world.enable(platform);
            platform.body.allowGravity = false;
            platform.body.immovable = true;
        }

        // Creates the player character
        let player = this.physics.add.sprite(500, 20, 'alien')
            .setScale(0.1); // Player Character Size

        // Adjusts the player hitbox
        player.body.setSize(player.width * 0.8, player.height * 0.7);
        player.body.setOffset(player.width * 0.1, player.height * 0.1);

        // Adjusts player physics
        player.body.setGravityY(500);
        player.setBounce(0.2);

        // Assign player to the class variable
        this.player = player;

        // Creates collider between platforms and player
        this.physics.add.collider(platforms, player, () => {
            isOnGround = true;

        });

        // Creates player movement
        const playerSpeed = 100;
        const jumpHeight = 500;
        let isOnGround = true;

        // Increase speed multiplier every 15 seconds
        this.speedMultiplier = 1;

        this.time.addEvent({
            delay: 15000,
            loop: true,
            callback: () => {
                this.speedMultiplier += 0.2;
                console.log('Speed Multiplier', this.speedMultiplier);

                // Adjusts the speed of each platform based on the speed multiplier
                platforms.children.iterate((platform) => {
                    platform.body.velocity.x = -200 * this.speedMultiplier;
                });

            },
        });

        // Creates a Event listener for reset score events
        this.events.on('resetScore', () => {
            this.score = 0;
            document.getElementById('score').textContent = this.score;
        });

        // Sets up User keyboard control
        const cursors = this.input.keyboard.createCursorKeys();
        const keyMap = {
            'LEFT': ['A', 'LEFT'],
            'RIGHT': ['D', 'RIGHT']
        };

        function handleKeyDown(direction) {
            return () => {
                try {
                    const velocityX = direction === 'LEFT' ? -playerSpeed : playerSpeed;
                    player.setVelocityX(velocityX * this.speedMultiplier);
                } catch (error) {
                    console.error('Error setting player velocity X:', error);
                }
            };
        }

        function handleKeyUp(direction) {
            return () => {
                try {
                    const oppositeKeys = keyMap[direction];
                    const oppositeKeyDown = oppositeKeys.some(key => cursors[key] && cursors[key].isDown);
                    if (!oppositeKeyDown) {
                        player.setVelocityX(0);
                    }
                } catch (error) {
                    console.error('Error setting player velocity X:', error);
                }
            };
        }

        this.input.keyboard.on('keydown-SPACE', () => {
            if (isOnGround) {
                player.setVelocityY(-jumpHeight);
                isOnGround = false;

            }
        });

        Object.keys(keyMap).forEach(direction => {
            const keys = keyMap[direction];
            keys.forEach(key => {
                this.input.keyboard.on(`keydown-${key}`, handleKeyDown.call(this, direction));
                this.input.keyboard.on(`keyup-${key}`, handleKeyUp.call(this, direction));
            });
        });

        // Check screen size
        const screenWidth = this.scale.width;
        const screenHeight = this.scale.height;

        if (screenWidth <= 800 && screenHeight <= 600) {
            // If User screen size is small (Tablet & below), create buttons touch screen buttons
            const jumpButton = this.add.image(750, 550, 'jumpButton').setInteractive();
            jumpButton.setScale(0.1);
            

            const leftButton = this.add.image(50, 550, 'leftButton').setInteractive();
            leftButton.setScale(0.1);
            

            const rightButton = this.add.image(150, 550, 'rightButton').setInteractive();
            rightButton.setScale(0.1);
            

            // Add touch controls
            jumpButton.on('pointerdown', () => {
                if (isOnGround) {
                    player.setVelocityY(-jumpHeight);
                    isOnGround = false;
                }
            });

            leftButton.on('pointerdown', () => {
                player.setVelocityX(-playerSpeed * this.speedMultiplier);
            });
            leftButton.on('pointerup', () => {
                if (!rightButton.isDown) {
                    player.setVelocityX(0);
                }
            });

            rightButton.on('pointerdown', () => {
                player.setVelocityX(playerSpeed * this.speedMultiplier);
            });
            rightButton.on('pointerup', () => {
                if (!leftButton.isDown) {
                    player.setVelocityX(0);
                }
            });
        } else {
            // For larger screens (e.g., desktop), no additional buttons are needed
            // because keyboard controls are available.
        }

        // Set up event listener for jump sound mute/unmute button
        const jumpAudioToggleBtn = document.querySelector('[data-type="audioToggle"]');
        jumpAudioToggleBtn.addEventListener('click', () => {
            this.isJumpMuted = !this.isJumpMuted;

            // Toggle mute/unmute button visibility
            const audioOnBtn = document.getElementById("audioOnBtn");
            const audioOffBtn = document.getElementById("audioOffBtn");
            if (this.isJumpMuted) {
                audioOnBtn.classList.add("hidden");
                audioOffBtn.classList.remove("hidden");
            } else {
                audioOffBtn.classList.add("hidden");
                audioOnBtn.classList.remove("hidden");
            }
        });

    }

    update() {

        if (this.player) {
            const incrementValue = 0.01;
            this.score += incrementValue;
            document.getElementById('score').textContent = Math.floor(this.score);

            // If player touches Bottom of Screen, activates Game Over
            if (this.player.y > this.game.config.height) {
                this.gameOver();
                // If player touches Left Screen, activates Game Over Two   
            } else if (this.player.x < 0) {
                this.gameOverTwo();
            }

        }

    }

    gameOver() {

        // Stops physics and player movement
        this.physics.pause();
        this.player.setVelocity(0, 0);

        // Transition to gameover,js scene
        console.log('Game Over detected loading scene...')
        this.scene.start('game-over');
    }

    gameOverTwo() {

        // Stops physics and player movement
        this.physics.pause();
        this.player.setVelocity(0, 0);

        // Transition to gameover,js scene
        console.log('Game Over Two detected loading scene...')
        this.scene.start('game-over-two');
    }
}