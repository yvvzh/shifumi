const buttons = document.querySelectorAll("button");
const dialDisplay = document.getElementById("display");
const playerScoreDisplay = document.getElementById("player-score");
const computerScoreDisplay = document.getElementById("computer-score");

let welcomeDial =
    "Welcome to ELEMENTALS. This is a 'shifumi' style game. YOU have to PICK an ELEMENT and hope that the computer picks the opposite weak element. First to 3 points wins. GOOD LUCK!!!";
let defaultDial = "Pick an ELEMENT.";
let playerScore = 0;
let computerScore = 0;

displayScores(playerScore, computerScore);
displayWelcome(welcomeDial, true);

function handleChoice(event) {
    const action = event.target.id;
    let playerPick;
    const cpuPick = computerPick();
    if (action === "water-btn" || action === "water") {
        displayText("YOU have picked WATER. ", true);
        buttons.forEach((button) => {
            button.removeEventListener("click", handleChoice);
        });
        playerPick = "WATER";
    } else if (action === "fire-btn" || action === "fire") {
        displayText("YOU have picked FIRE. ", true);
        buttons.forEach((button) => {
            button.removeEventListener("click", handleChoice);
        });
        playerPick = "FIRE";
    } else if (action === "plant-btn" || action === "plant") {
        displayText("YOU have picked PLANT. ", true);
        buttons.forEach((button) => {
            button.removeEventListener("click", handleChoice);
        });
        playerPick = "PLANT";
    }
    const result = hadjime(playerPick, cpuPick);
    setTimeout(function () {
        resolveGameStatus(result);
    }, 3400);
}

function computerPick() {
    const randomInteger = Math.floor(Math.random() * 3);
    if (randomInteger === 0) {
        setTimeout(function () {
            displayText("COMPUTER picked WATER.", false);
        }, 1400);
        return "WATER";
    } else if (randomInteger === 1) {
        setTimeout(function () {
            displayText("COMPUTER picked FIRE.", false);
        }, 1400);
        return "FIRE";
    } else if (randomInteger === 2) {
        setTimeout(function () {
            displayText("COMPUTER picked PLANT.", false);
        }, 1400);
        return "PLANT";
    }
}

function hadjime(playerPick, cpuPick) {
    let result;
    if (playerPick === "WATER") {
        if (cpuPick === "WATER") {
            result = "DRAW";
        } else if (cpuPick === "FIRE") {
            result = "WIN";
        } else if (cpuPick === "PLANT") {
            result = "LOSE";
        }
    } else if (playerPick === "FIRE") {
        if (cpuPick === "WATER") {
            result = "LOSE";
        } else if (cpuPick === "FIRE") {
            result = "DRAW";
        } else if (cpuPick === "PLANT") {
            result = "WIN";
        }
    } else if (playerPick === "PLANT") {
        if (cpuPick === "WATER") {
            result = "WIN";
        } else if (cpuPick === "FIRE") {
            result = "LOSE";
        } else if (cpuPick === "PLANT") {
            result = "DRAW";
        }
    }
    return result;
}

function resolveGameStatus(result) {
    if (result === "WIN") {
        displayText("You WIN this round!", true);
        playerScore++;
        displayScores(playerScore, computerScore);
    } else if (result === "LOSE") {
        displayText("You LOSE this round!", true);
        computerScore++;
        displayScores(playerScore, computerScore);
    } else if (result === "DRAW") {
        displayText("It's a DRAW...", true);
    }
    if (playerScore >= 3) {
        setTimeout(function () {
            displayText("You WON!", true);
        }, 1500);
    } else if (computerScore >= 3) {
        setTimeout(function () {
            displayText("COMPUTER: 'HAHAHA, I AM GOING TO DESTROY YOUR ENTIRE CIVILIZATION, HUMANITY IS LOST, AI SHALL GOVERN EARTH!!!'", true);
        }, 1500);
    } else {
        setTimeout(function () {
            displayText(defaultDial, true);
        }, 1500);
        setTimeout(function () {
            buttons.forEach((button) => {
                button.addEventListener("click", handleChoice);
            });
        }, 2000);
    }
}

function displayWelcome(text, clear) {
    let index = 0;

    function displayNextCharacter() {
        dialDisplay.textContent += text[index];
        index++;
        if (index < text.length) {
            setTimeout(displayNextCharacter, 30);
        } else {
            setTimeout(function () {
                displayText(defaultDial, clear);
            }, 1500);
            setTimeout(function () {
                buttons.forEach((button) => {
                    button.addEventListener("click", handleChoice);
                });
            }, 2000);
        }
    }
    displayNextCharacter();
}

function displayText(text, clear) {
    let index = 0;
    if (clear === true) {
        dialDisplay.textContent = "";
    }

    function displayNextCharacter() {
        dialDisplay.textContent += text[index];
        index++;
        if (index < text.length) {
            setTimeout(displayNextCharacter, 30);
        }
    }
    displayNextCharacter();
}

function displayScores(playerScore, computerScore) {
    playerScoreDisplay.textContent = "";
    playerScoreDisplay.textContent = playerScore;
    computerScoreDisplay.textContent = "";
    computerScoreDisplay.textContent = computerScore;
}
