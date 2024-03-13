import Phaser from '/lib/phaser.js'

import Game from '/scenes/Game.js'

import GameOver from '/scenes/GameOver.js'

export default new Phaser.Game ({
    type: Phaser.CANVAS,
    width: 1920,
    height: 1080,
    scene: [Game, GameOver],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                x: -10
            },
            debug: false
        }
    },
});



