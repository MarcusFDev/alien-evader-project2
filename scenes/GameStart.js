import Phaser from '../lib/phaser.js'

export default class GameStart extends Phaser.Scene {

    constructor() {
        super('game-start')
    }

    preload() {
        // Loads the game start background
        this.load.image('gamemenuscr', 'assets/images/game-assets/gamemenu-screen.webp');

    }

    create() {
        // The Game Menu image
        this.add.image(0, 0, 'gamemenuscr').setOrigin(0, 0);
    }

}