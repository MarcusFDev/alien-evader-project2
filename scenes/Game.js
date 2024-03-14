import Phaser from '../lib/phaser.js'

export default class Game extends Phaser.Scene {

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

        // Loads the player character
        this.load.image('alien', 'assets/images/game-assets/player-model.webp');
    }

    create() {

        // Hides Start & Menu buttons
        const startButton = document.querySelector('[data-type="start-btn"]');
        startButton.classList.add('hidden');

        const gameMenuButton = document.querySelector('[data-type="gameMenu-btn"]');
        gameMenuButton.classList.add('hidden');

        // Adds the background image
        this.add.image(0, 0, 'skyline').setOrigin(0, 0);

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

        // Creates the player character
        let player = this.physics.add.sprite(240, 20, 'alien')
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

        // Event listener to detect for User "Space" key input
        this.input.keyboard.on('keydown-SPACE', () => {
            if (isOnGround) {
                player.setVelocityY(-jumpHeight);
                isOnGround = false;
            }
        });

        // Event listener to detect for User "Left" arrow key input
        this.input.keyboard.on('keydown-LEFT', () => {
            try {
                player.setVelocityX(-playerSpeed * this.speedMultiplier);
            } catch (error) {
                console.error('Error setting player velocity X:', error);
            }
        });

        //Event listener to detect for User "A" key input

        this.input.keyboard.on('keydown-A', () => {
            try {
                player.setVelocityX(-playerSpeed * this.speedMultiplier);
            } catch (error) {
                console.error('Error setting player velocity X:', error);
            }
        });

        //Event listener to detect for User "Right" arrow key input

        this.input.keyboard.on('keydown-RIGHT', () => {
            try {
                player.setVelocityX(playerSpeed * this.speedMultiplier);
            } catch (error) {
                console.error('Error setting player velocity X:', error);
            }
        });

        //Event listener to detect for User "D" key input

        this.input.keyboard.on('keydown-D', () => {
            try {
                player.setVelocityX(playerSpeed * this.speedMultiplier);
            } catch (error) {
                console.error('Error setting player velocity X:', error);
            }
        });

        // Stop moving left when "Left" arrow key is released by User

        this.input.keyboard.on('keyup-LEFT', () => {
            try {
                if (!cursors.right.isDown && !this.input.keyboard.checkDown(this.input.keyboard.addKey('D'))) {
                    player.setVelocityX(0);
                }
            } catch (error) {
                console.error('Error setting player velocity X:', error);
            }
        });

        // Stop moving left when "A" key is released by User

        this.input.keyboard.on('keyup-A', () => {
            try {
                if (!cursors.right.isDown && !this.input.keyboard.checkDown(this.input.keyboard.addKey('D'))) {
                    player.setVelocityX(0);
                }
            } catch (error) {
                console.error('Error setting player velocity X:', error);
            }
        });

        // Stop moving left when "Right" arrow key is released by User

        this.input.keyboard.on('keyup-RIGHT', () => {
            try {
                if (!cursors.left.isDown && !this.input.keyboard.checkDown(this.input.keyboard.addKey('A'))) {
                    player.setVelocityX(0);
                }
            } catch (error) {
                console.error('Error setting player velocity X:', error);
            }
        });

        // Stop moving left when "D" key is released by User

        this.input.keyboard.on('keyup-D', () => {
            try {
                if (!cursors.left.isDown && !this.input.keyboard.checkDown(this.input.keyboard.addKey('A'))) {
                    player.setVelocityX(0);
                }
            } catch (error) {
                console.error('Error setting player velocity X:', error);
            }
        });

    }

    update() {

        if (this.player) {
            this.score += 1;
            this.scoreText.setText('Score: ' + this.score);

            // If player touches Bottom of Screen, activates Game Over
            if (this.player.y > this.game.config.height) {
                this.gameOver();
            }

            // If player touches Left Screen, activates Game Over
            if (this.player.x < 0) {
                this.gameOver();
            }

        }
    }

    gameOver() {

        // Stops physics and player movement
        this.physics.pause();
        this.player.setVelocity(0, 0);

        // Transition to GameOver,js scene
        console.log('Game Over detected loading scene...')
        this.scene.start('game-over');
    }
}