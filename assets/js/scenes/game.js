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

        this.load.image('alienship', 'assets/images/game-assets/alienship.webp')

        // Loads the player character
        this.load.image('alien', 'assets/images/game-assets/player-model.webp');
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

        // Adds the background image
        this.add.image(0, 0, 'skyline').setOrigin(0, 0);

        // Adds the Alien spaceship image
        const alienShip = this.add.image(-200, 0, 'alienship').setOrigin(0, 0);
        alienShip.setScale(0.5);

        // Creates an array of building platform images
        const platformImages = ['building1']; // Array for easy implementation of new images

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

        alienShip.setDepth(1);

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

        // Displays score text
        this.scoreText = this.add.text(16, 16, 'Score: 0', {
            fontSize: '32px',
            fill: '#fff',
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

    }

    update() {

        if (this.player) {
            this.score += 1;
            this.scoreText.setText('Score: ' + this.score);

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