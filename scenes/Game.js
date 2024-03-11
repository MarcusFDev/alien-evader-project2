import Phaser from '../lib/phaser.js'

export default class Game extends Phaser.Scene {

    /** @type {Phaser.Physics.Arcade.Sprite} */
  
    constructor() {
        super('game')
    }

    preload() {
        // Loads the game canvas background
        this.load.image('skyline-backdrop', 'assets/images/game-assets/game-background.webp');

        // Loads the city building platforms
        this.load.image('building1', 'assets/images/game-assets/city-building1.webp');

        // Loads the player character
        this.load.image('alien', 'assets/images/player-models/player-model.webp');
    }
}