import Phaser from '../lib/phaser.js'

export default class GameStart extends Phaser.Scene {

    constructor() {
        super('game-start')
    }

    preload() {
        // Loads the game start background
        this.load.image('gamestartscr', 'assets/images/game-assets/gamemenu-screen.webp');

    }

    create() {
        
    }

}