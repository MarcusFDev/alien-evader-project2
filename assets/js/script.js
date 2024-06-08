import Phaser from './lib/phaser.js';
import gamemenu from './scenes/gamemenu.js';
import gamehowtoplay from './scenes/gamehowtoplay.js';
import gameScene from './scenes/game.js';
import gameover from './scenes/gameover.js';
import gameovertwo from './scenes/gameovertwo.js';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('gameContainer');
    const gameCanvas = document.getElementById('gameCanvas');

    if (container && gameCanvas) {
        // Ensure canvas has no margin or padding
        setCanvasStyles(gameCanvas);

        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;

        // Declare the game variable in the outer scope
        let phaserGame = new Phaser.Game({
            type: Phaser.CANVAS,
            width: containerWidth,
            height: containerHeight,
            scale: {
                mode: Phaser.Scale.NONE,
                autoCenter: Phaser.Scale.CENTER_BOTH
            },
            scene: [gamemenu, gamehowtoplay, gameScene, gameover, gameovertwo],
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 0 },
                    debug: false
                }
            },
            canvas: gameCanvas
        });

        // Resize the game canvas when the window is resized
        window.addEventListener('resize', () => {
            const newWidth = container.clientWidth;
            const newHeight = container.clientHeight;
            phaserGame.scale.resize(newWidth, newHeight);

            // Ensures canvas stays without margin or padding
            setCanvasStyles(gameCanvas);
        });

    } else {
        console.error('Game container or canvas element not found');
    }

    // Form functionality to send users to thankyou.html page
    $(document).ready(function () {
        $('#feedback-form').submit(function (event) {
            event.preventDefault();
            validateForm(event);
        });
    });

    function validateForm(event) {
        event.preventDefault();

        const formElements = document.getElementById("feedback-form").elements;
        let isValid = true;

        for (let i = 0; i < formElements.length; i++) {
            const element = formElements[i];
            if (element.dataset.type && element.value.trim() === "") {
                alert("Please fill out all available fields");
                isValid = false;
                break;
            }
        }

        if (isValid) {
            // If all fields are filled in, this will send user to thankyou.html
            window.location.href = "thankyou.html";
            console.log('This triggers if form is validated');
        }

        return isValid;
    }

    // Pop Up Message notice functionality for 768px screens & below
    function dismissWarning() {
        const popUpMessage = document.querySelector('.popup-message');
        if (popUpMessage) {
            popUpMessage.classList.add('hidden');
        }
    }

    if (window.matchMedia('(max-width: 800px)').matches) {
        const popUpMessage = document.querySelector('.popup-message');
        if (popUpMessage) {
            popUpMessage.classList.remove('hidden');

            const dismissBtn = document.querySelector('.dismiss-btn');
            if (dismissBtn) {
                dismissBtn.addEventListener('click', dismissWarning);
                dismissBtn.addEventListener('touchend', dismissWarning, { passive: true });
            }
        }
    }
});

function setCanvasStyles(canvas) {
    canvas.style.margin = '0';
    canvas.style.padding = '0';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
}