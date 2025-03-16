'use strict';


// Selecting elements
const scoreOneElement = document.getElementById("score--0");
const scoreTwoElement = document.getElementById("score--1");

const playerOneElement = document.getElementById("player--0");
const playerTwoElement = document.getElementById("player--1");

const currentScoreOneElement = document.getElementById("current--0");
const currentScoreTwoElement = document.getElementById("current--1");

const dice = document.getElementById("dice");
const btnNew = document.getElementById("btnNew");
const btnRoll = document.getElementById("btnRoll");
const btnHold = document.getElementById("btnHold");


// Set the initial states
scoreOneElement.innerText = 0;
scoreTwoElement.innerText = 0;
dice.classList.add("diceHidden");

let currentScore = 0;
let currentPlayer = 0;
let scores = [0, 0];

const winningScore = 20;
let gameOver = false;


// Rolling dice functionality
btnRoll.addEventListener("click", () => {
    // Return if the game is over
    if (gameOver) return;
    
    // Generate a random dice roll
    const randomDiceNumber = Math.trunc(Math.random() * 6) + 1;

    // Display the dice
    dice.classList.remove("diceHidden");
    dice.src = `./Assets/Images/dice-${randomDiceNumber}.png`;

    // Check if rolled; if true, add the score
    if (randomDiceNumber !== 1) {
        currentScore += randomDiceNumber;
        document.getElementById(`current--${currentPlayer}`).innerText = currentScore;
    }
    else {
        currentScore = 0;
        document.getElementById(`current--${currentPlayer}`).innerText = 0;
        
        switchPlayer();
    }
});


// Holding score functionality
btnHold.addEventListener("click", () => {
    // Return if the game is over
    if (gameOver) return;
    
    // Add current score to the current player's score
    scores[currentPlayer] += currentScore;
    document.getElementById(`score--${currentPlayer}`).innerText = scores[currentPlayer];

    // Check if score is enough to win; if true, finish the game
    if (scores[currentPlayer] >= winningScore) {
        document.getElementById(`player--${currentPlayer}`).classList.add("player--winner");
        dice.classList.add("diceHidden");
        
        // Over the game
        gameOver = true;
    }

    // If false, switch to the next player
    else {
        currentScore = 0;
        document.getElementById(`current--${currentPlayer}`).innerText = 0;

        switchPlayer();
    }
});


// Switch the player if the roll is 1
function switchPlayer() {
    currentPlayer = currentPlayer === 0 ? 1 : 0;
    
    playerOneElement.classList.toggle("player--active");
    playerTwoElement.classList.toggle("player--active");
}


// Start a new game
btnNew.addEventListener("click", () => {
    gameOver = false;
    
    dice.classList.add("diceHidden");
    
    currentScore = 0;
    currentPlayer = 0;
    scores = [0, 0];
    
    scoreOneElement.innerText = 0;
    scoreTwoElement.innerText = 0;
    
    currentScoreOneElement.innerText = 0;
    currentScoreTwoElement.innerText = 0;
    
    playerOneElement.classList.remove("player--winner");
    playerTwoElement.classList.remove("player--winner");
    
    playerOneElement.classList.add("player--active");
    playerTwoElement.classList.remove("player--active");
});