function moveLeft() {
    let left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    left -= 200;
    if (left >= 0) {
        character.style.left = left + "px";
    }
}

function moveRight() {
    let left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    left += 200;
    if (left <= 500) {
        character.style.left = left + "px";
    }
}

function resetGame() {
    stopTimer();
    counter = 0;
    animationDuration = initialAnimationDuration;

    gameOverText.style.display = 'block';
    setTimeout(() => {
        gameOverText.style.opacity = 1;
    }, 10);

    updateScore;
    gameOverText.innerHTML = "Game Over! Your Score: " + score + " seconds";
    postplayerscore();
}

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
        moveLeft();
    }
    if (event.key === "ArrowRight") {
        moveRight();
    }
});

var block = document.getElementById("block");
var character = document.getElementById("character");
var gameOverText = document.getElementById('game-over-text');
var scoreDisplay = document.getElementById('score-display');
var counter = 0;
var initialAnimationDuration = 1000;
var animationDuration = initialAnimationDuration;
var startTime;
var score = 0;
var timerInterval;
var timerStarted;
var gameOverInterval;

function updateScore(){
    scoreDisplay.textContent = "Score: " + score;
}

block.addEventListener('animationiteration', () => {
    var random = Math.floor(Math.random() * 3);
    left = random * 200;
    block.style.left = left + "px";
    counter++;
    score++;
    updateScore();

    animationDuration *= 0.95;
    block.style.animationDuration = `${animationDuration / 500}s`;

    block.style.animation = 'none';
    void block.offsetWidth;
    block.style.animation = `slide ${animationDuration / 500}s infinite`;

   updateScore;
});

function resetTimer() {
    clearInterval(timerInterval);
    startTime = 0;
    timerStarted = false;
}

function stopTimer() {
    clearInterval(timerInterval);
    displayScore();
    showGameOver();
}

function displayScore() {
    console.log("Your Score: " + score + " seconds");
}

var gameOverText = document.getElementById('game-over-text');

setInterval(function () {
    var characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    var blockTop = parseInt(window.getComputedStyle(block).getPropertyValue("top"));

    if (characterLeft == blockLeft && blockTop < 800 && blockTop > 600) {
        resetGame();
    }
}, 1);
function restartGame() {
    block.style.animation = "slide 1s infinite";
    counter = 0;
    score = 0;
    scoreDisplay.textContent = "Score: " + score;
    animationDuration = initialAnimationDuration;

    gameOverText.style.display = 'none';

    var restartButton = document.getElementById('restart-button');
    if (restartButton) {
        restartButton.style.display = 'none';
    }

    resetTimer();

    block.style.animation = `slide ${animationDuration / 500}s infinite`;

    clearInterval(gameOverInterval);
    gameOverInterval = setInterval(checkGameOver, 1);
}

function checkGameOver() {
    var characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    var blockTop = parseInt(window.getComputedStyle(block).getPropertyValue("top"));

    var range = 30;

    if (characterLeft >= blockLeft - range && characterLeft <= blockLeft + range && blockTop < 800 && blockTop > 600) {
        clearInterval(gameOverInterval);
        updateScore;
        displayScore;
        showGameOver();
    }
}

function showGameOver() {
    block.style.animation = "none";

    gameOverText.style.display = 'block';

    document.getElementById('restart-button').style.display = 'block';
}
document.getElementById('restart-button').addEventListener('click', function () {
    restartGame();
});
