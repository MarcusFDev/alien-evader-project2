import Phaser from '../lib/phaser.js'

import GameStart from '../scenes/GameStart.js'

import Game from '../scenes/Game.js'

import GameOver from '../scenes/GameOver.js'

function initializeGame() {
    return new Phaser.Game({
        type: Phaser.CANVAS,
        width: 1920,
        height: 1080,
        scene: [GameStart, Game, GameOver],
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {
                    x: -10
                },
                debug: false
            }
        },
        parent: 'gameContainer'
    });
}

// When DOM content is loaded, activate game
document.addEventListener('DOMContentLoaded', () => {
    initializeGame();
});