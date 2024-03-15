import Phaser from '/alien-evader-project2/lib/phaser.js'

import gamemenu from '/alien-evader-project2/scenes/gamemenu.js'

import game from '/alien-evader-project2/scenes/game.js'

import gameover from '/alien-evader-project2/scenes/gameover.js'

function initializeGame() {
    return new Phaser.Game({
        type: Phaser.CANVAS,
        width: 1920,
        height: 1080,
        scene: [gamemenu, game, gameover],
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