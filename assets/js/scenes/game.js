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

        // Check screen size
        const screenWidth = this.scale.width;
        const screenHeight = this.scale.height;
        const isSmallScreen = screenWidth <= 560;

        // Defines individual scale based on screen size
        const backgroundScale = isSmallScreen ? 0.7 : 1;
        const alienShipScale = isSmallScreen ? 0.3 : 0.5;
        const platformScale = isSmallScreen ? 0.3 : 0.4;
        const playerScale = isSmallScreen ? 0.09 : 0.1;

        // Adds the background image
        const background = this.add.image(screenWidth / 2, screenHeight / 2, 'skyline').setOrigin(0.5);
        background.setScale(backgroundScale);

        if (isSmallScreen) {
            // Adds the Alien spaceship image
            const alienShip = this.add.image(-145, 0, 'alienship').setOrigin(0, 0);
            alienShip.setScale(alienShipScale);
            alienShip.setDepth(1);
        } else {
            // Adds the Alien spaceship image
            const alienShip = this.add.image(-200, 0, 'alienship').setOrigin(0, 0);
            alienShip.setScale(alienShipScale);
            alienShip.setDepth(1);
        }
        // Creates an array of building platform images
        const platformImages = ['building1', 'building2', 'building3', 'building4', 'building5', 'building6', 'building7'];

        // Creates the platforms group
        const platforms = this.physics.add.group({
            allowGravity: false,
            immovable: true,
            velocityX: -200, // Initial speed of platforms
        });

        // Define the minimum Y position for platform spawning
        const minYPosition = screenHeight + 0.02;

        // Define the x increment for platforms
        const platformXIncrement = isSmallScreen ? 600 : 800;

        // Variable to hold the second platform spawned
        let secondPlatform;

        // Creates game loop for platforms
        for (let i = 0; i < 999; ++i) {
            const x = platformXIncrement * i; // Distance between buildings
            let y;

            // For mobile screens, adjust the Y position of platform spawning
            if (isSmallScreen) {
                y = Phaser.Math.Between(minYPosition, screenHeight + 0.2); // Randomized height of buildings for mobile
            } else {
                y = Phaser.Math.Between(750, 1050); // Randomized height of buildings
            }

            // Randomly select a platform image from array
            const randomImage = Phaser.Math.RND.pick(platformImages);

            const platform = platforms.create(x, y, randomImage).setScale(platformScale);

            // Enables physics for the platforms
            this.physics.world.enable(platform);
            platform.body.allowGravity = false;
            platform.body.immovable = true;

            // Save the second platform created
            if (i === 1) {
                secondPlatform = platform;
            }
        }

        // Checks if second platform exists and sets player position
        let initialPlayerX = screenWidth / 3;
        let initialPlayerY = screenHeight * 0.2;
        if (secondPlatform) {
            initialPlayerX = Math.min(secondPlatform.x, screenWidth - 100); // Spawns player on screen in view
            initialPlayerY = secondPlatform.y - 500; // Value to place the player above the second platform
        }

        // Create player character using initialPlayerX and initialPlayerY
        const player = this.physics.add.sprite(initialPlayerX, initialPlayerY, 'alien').setScale(playerScale);

        // Adjusts the player hitbox
        player.body.setSize(player.width * 0.8, player.height * 0.7);
        player.body.setOffset(player.width * 0.1, player.height * 0.1);

        // Adjusts player physics
        player.body.setGravityY(500);
        player.setBounce(0.2);

        // Assign player to the class variable
        this.player = player;

        // Set up the camera to follow the player
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, this.scale.width, this.scale.height);

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

        if (screenWidth <= 800) {
            // Touchscreen controls
            const buttonOffsetX = 40; // Offset from the side of the canvas
            const buttonOffsetY = 465; // Y position of the buttons

            const leftButton = this.add.image(buttonOffsetX, buttonOffsetY, 'leftButton').setInteractive();
            leftButton.setScale(0.15);

            const rightButton = this.add.image(this.scale.width - buttonOffsetX, buttonOffsetY, 'rightButton').setInteractive();
            rightButton.setScale(0.15);

        
            // Add touch control for left movement
            leftButton.on('pointerdown', () => {
                player.setVelocityX(-playerSpeed * this.speedMultiplier);
            });
            leftButton.on('pointerup', () => {
                player.setVelocityX(0);
            });
        
            // Add touch control for right movement
            rightButton.on('pointerdown', () => {
                player.setVelocityX(playerSpeed * this.speedMultiplier);
            });
            rightButton.on('pointerup', () => {
                player.setVelocityX(0);
            });
        
            // Add touch control for jump (anywhere on the screen except buttons area)
            this.input.on('pointerdown', (pointer) => {
                const isOverButton = leftButton.getBounds().contains(pointer.x, pointer.y) ||
                                     rightButton.getBounds().contains(pointer.x, pointer.y);
                if (!isOverButton && isOnGround) {
                    player.setVelocityY(-jumpHeight);
                    isOnGround = false;
                }
            });

        } else {
            // Keyboard controls
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
                audioOffBtn.classList.add('hidden');
                audioOnBtn.classList.remove('hidden');
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