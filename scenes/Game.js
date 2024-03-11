import Phaser from '../lib/phaser.js'

export default class Game extends Phaser.Scene {

    /** @type {Phaser.Physics.Arcade.Sprite} */
    player

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

        // Add the background image
        this.add.image(0, 0, 'skyline').setOrigin(0, 0);

        // Creates an array of building platform images
        const platformImages = ['building1']; // Enables easy implementation of new images

        // Create the platforms group
        const platforms = this.physics.add.group({
            allowGravity: false,
            immovable: true,
            velocityX: -200, // Initial speed of platforms
        });

        // Creates game loop for platforms
        for (let i = 0; i < 999; ++i) {
            const x = 800 * i; // Distance between buildings
            const y = Phaser.Math.Between(750, 1050); // Randomized height of buildings

            // Randomly select a platform image
            const randomImage = Phaser.Math.RND.pick(platformImages);

            const platform = platforms.create(x, y, randomImage).setScale(0.4);

            // Enable physics for the platform
            this.physics.world.enable(platform);
            platform.body.allowGravity = false;
            platform.body.immovable = true;
        }

        // Creates the player character
        const player = this.physics.add.sprite(240, 20, 'alien')
            .setScale(0.1); // Player Character Size

        // Adjust the player's hitbox
        player.body.setSize(player.width * 0.8, player.height * 0.7);
        player.body.setOffset(player.width * 0.1, player.height * 0.1);

        // Set up player physics
        player.body.setGravityY(500);
        player.setBounce(0.2);

        // Add collider between platforms and player
        this.physics.add.collider(platforms, player, () => {
            isOnGround = true;

        });

        // Set up player movement
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
    }
}