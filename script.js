// DOM Elements
const wordDisplay = document.getElementById('scrambled-word');
const hintText = document.getElementById('hint');
const userInput = document.getElementById('user-input');
const checkBtn = document.getElementById('check-btn');
const nextBtn = document.getElementById('next-btn');
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time-left');
const resultModal = document.getElementById('result-modal');
const resultMessage = document.getElementById('result-message');
const correctWordElement = document.getElementById('correct-word');
const continueBtn = document.getElementById('continue-btn');

// Game Variables
let currentWord = "";
let scrambledWord = "";
let score = 0;
let timeLeft = 30;
let timer;

// Word list with hints
const words = [
    { word: "tiger", hint: "Animal with stripes" },
    { word: "ocean", hint: "Covers most of Earth's surface" },
    { word: "planet", hint: "Celestial body that orbits a star" },
    { word: "guitar", hint: "Musical instrument with strings" },
    { word: "oxygen", hint: "Element we breathe" },
    { word: "mountain", hint: "Large natural elevation of the earth's surface" },
    { word: "painting", hint: "Art form using colors on a surface" },
    { word: "astronomy", hint: "Study of celestial objects" },
    { word: "football", hint: "Popular sport played with a ball" },
    { word: "chocolate", hint: "Sweet food made from cacao beans" },
    { word: "butterfly", hint: "Insect with colorful wings" },
    { word: "history", hint: "Study of past events" },
    { word: "pizza", hint: "Italian dish with toppings" },
    { word: "computer", hint: "Electronic device for processing data" },
    { word: "bicycle", hint: "Two-wheeled vehicle" }
];

// Initialize the game
function initGame() {
    resetTimer();
    getRandomWord();
    userInput.value = "";
    userInput.focus();
}

// Get a random word from the list
function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    const wordObj = words[randomIndex];
    currentWord = wordObj.word;
    hintText.innerText = wordObj.hint;
    
    // Scramble the word
    scrambledWord = scrambleWord(currentWord);
    wordDisplay.innerText = scrambledWord;
}

// Scramble the word
function scrambleWord(word) {
    // Convert the word to an array, shuffle it, and join back to a string
    let chars = word.split("");
    
    // Keep shuffling until we get a different arrangement
    let shuffled;
    do {
        shuffled = [...chars].sort(() => Math.random() - 0.5).join("");
    } while (shuffled === word);
    
    return shuffled.toUpperCase();
}

// Check the user's answer
function checkAnswer() {
    const userAnswer = userInput.value.toLowerCase().trim();
    
    if (userAnswer === currentWord) {
        // Correct answer
        clearInterval(timer);
        score += 5;
        scoreElement.innerText = score;
        
        showResult(true);
    } else {
        // Wrong answer
        showResult(false);
    }
}

// Show result modal
function showResult(isCorrect) {
    resultModal.classList.add('show');
    
    if (isCorrect) {
        resultMessage.innerText = "Correct!";
        resultMessage.style.color = "#4CAF50";
        correctWordElement.innerText = "";
    } else {
        resultMessage.innerText = "Incorrect!";
        resultMessage.style.color = "#F44336";
        correctWordElement.innerText = `Correct word: ${currentWord.toUpperCase()}`;
    }
}

// Reset the timer
function resetTimer() {
    clearInterval(timer);
    timeLeft = 30;
    timeElement.innerText = timeLeft;
    
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            timeElement.innerText = timeLeft;
        } else {
            clearInterval(timer);
            showResult(false);
        }
    }, 1000);
}

// Event Listeners
checkBtn.addEventListener('click', checkAnswer);

nextBtn.addEventListener('click', initGame);

continueBtn.addEventListener('click', () => {
    resultModal.classList.remove('show');
    initGame();
});

userInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        checkAnswer();
    }
});

// Start the game when the page loads
window.onload = initGame; 