import Phaser from '../lib/phaser.js'

export default class Game extends Phaser.Scene {

        /** @type {Phaser.Physics.Arcade.Sprite} */

        constructor() {
            super('game')
        }

        preload() {
            // Loads the game canvas background
            this.load.image('skyline', 'assets/images/game-assets/game-background.webp');

            // Loads the city building platforms
            this.load.image('building1', 'assets/images/game-assets/city-building1.webp');

            // Loads the player character
            this.load.image('alien', 'assets/images/player-models/player-model.webp');
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
        }
    }