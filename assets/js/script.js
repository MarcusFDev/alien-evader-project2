import Phaser from './lib/phaser.js'

import gamemenu from './scenes/gamemenu.js'

import gamehowtoplay from './scenes/gamehowtoplay.js'

import game from './scenes/game.js'

import gameover from './scenes/gameover.js'

import gameovertwo from './scenes/gameovertwo.js'

function initializeGame() {
    const gameWidth = document.getElementById('gameContainer').offsetWidth;
    const gameHeight = document.getElementById('gameContainer').offsetHeight;

    return new Phaser.Game({
        type: Phaser.CANVAS,
        width: gameWidth,
        height: gameHeight,
        scene: [gamemenu, gamehowtoplay, game, gameover, gameovertwo],
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {
                    x: -10
                },
                debug: false
            }
        },
        canvas: document.getElementById('gameCanvas')
    });
}

// When DOM content is loaded, activate game
document.addEventListener('DOMContentLoaded', () => {
    initializeGame();
});