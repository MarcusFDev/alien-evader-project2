import Phaser from '../lib/phaser.js'

export default class GameOver extends Phaser.Scene {

    constructor() {
        super('game-over')
    }

    create() {
        // The Game Over message
        const width = this.scale.width
        const height = this.scale.height

        this.add.text(width * 0.5, height * 0.5, 'Game Over', {
            fontSize: 50
                
        })

    }

    preload() {
        // Loads the game canvas background
        this.load.image('gameoverscr', 'assets/images/game-assets/gameover-screen.webp');

    }
}