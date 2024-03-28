import Phaser from './lib/phaser.js'

import gamemenu from './scenes/gamemenu.js'

import gamehowtoplay from './scenes/gamehowtoplay.js'

import game from './scenes/game.js'

import gameover from './scenes/gameover.js'

import gameovertwo from './scenes/gameovertwo.js'

// Phaser game basic setup code

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

// Form functionality to send users to thankyou.html page

$(document).ready(function () {
    $('#feedback-form').submit(function (event) {
        event.preventDefault();
        validateForm(event);
    });
});

function validateForm(event) {
    event.preventDefault();

    var formElements = document.getElementById("feedback-form").elements;
    var isValid = true;

    for (var i = 0; i < formElements.length; i++) {
        var element = formElements[i];
        if (element.dataset.type && element.value.trim() === "") {
            alert("Please fill out all available fields");
            isValid = false;
            break;
        }
    }

    if (isValid) {
        // If all fields are filled in, this will send user to thankyou.html
        window.location.href = "thankyou.html";
        console.log('This triggers if form is validated')
    }

    return isValid;

}
// Pop Up Message notice functionality for 768px screens & below

document.addEventListener('DOMContentLoaded', function () {
    // Function to dismiss the pop-up message
    function dismissWarning() {
        var popUpMessage = document.querySelector('.popup-message');
        if (popUpMessage) {
            popUpMessage.classList.add('hidden');
        }
    }

    // Display the pop-up message if the screen width is <= 768
    if (window.innerWidth <= 768) {
        var popUpMessage = document.querySelector('.popup-message');
        if (popUpMessage) {
            popUpMessage.classList.remove('hidden');

            // Attach event listener to the dismiss button for click and touch events
            var dismissBtn = document.querySelector('.dismiss-btn');
            if (dismissBtn) {
                dismissBtn.addEventListener('click', dismissWarning);
                dismissBtn.addEventListener('touchend', dismissWarning);
            }
        }
    }
});