class HangmanGame {
    constructor() {
        this.words = [];
        this.hangmanStates = [
            `
  +---+
  |   |
      |
      |
      |
      |
=========`,
            `
  +---+
  |   |
  O   |
      |
      |
      |
=========`,
            `
  +---+
  |   |
  O   |
  |   |
      |
      |
=========`,
            `
  +---+
  |   |
  O   |
 /|   |
      |
      |
=========`,
            `
  +---+
  |   |
  O   |
 /|\\  |
      |
      |
=========`,
            `
  +---+
  |   |
  O   |
 /|\\  |
 /    |
      |
=========`,
            `
  +---+
  |   |
  O   |
 /|\\  |
 / \\  |
      |
=========`
        ];
        
        this.word = '';
        this.guessedLetters = new Set();
        this.remainingLives = 6;
        this.gameOver = false;
        
        // DOM elements
        this.wordDisplay = document.getElementById('word-display');
        this.hangmanDrawing = document.getElementById('hangman-drawing');
        this.message = document.getElementById('message');
        this.livesDisplay = document.getElementById('lives');
        this.keyboard = document.getElementById('keyboard');
        
        // Initialize the keyboard only
        this.initializeKeyboard();
        
        // Load words first, then start the game
        this.loadWords(); // Remove the newGame() call from here
        
        // Event listeners
        document.getElementById('new-game-btn').addEventListener('click', () => this.newGame());
    }
    
    initializeKeyboard() {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        this.keyboard.innerHTML = '';
        
        for (const letter of alphabet) {
            const button = document.createElement('button');
            button.className = 'key';
            button.textContent = letter;
            button.addEventListener('click', () => this.makeGuess(letter));
            this.keyboard.appendChild(button);
        }
    }
    
    newGame() {
        this.word = this.words[Math.floor(Math.random() * this.words.length)].toLowerCase();
        this.guessedLetters.clear();
        this.remainingLives = 6;
        this.gameOver = false;
        
        // Reset UI
        this.updateDisplay();
        this.message.textContent = '';
        document.querySelectorAll('.key').forEach(key => {
            key.classList.remove('used');
            key.disabled = false;
        });
    }
    
    updateDisplay() {
        // Update word display
        this.wordDisplay.textContent = this.word
            .split('')
            .map(letter => this.guessedLetters.has(letter) ? letter : '_')
            .join(' ');
        
        // Update hangman drawing
        this.hangmanDrawing.textContent = this.hangmanStates[6 - this.remainingLives];
        
        // Update lives
        this.livesDisplay.textContent = `Lives: ${this.remainingLives}`;
    }
    
    makeGuess(letter) {
        if (this.gameOver || this.guessedLetters.has(letter)) return;
        
        // Mark letter as used
        this.guessedLetters.add(letter);
        const button = Array.from(document.querySelectorAll('.key'))
            .find(key => key.textContent === letter);
        button.classList.add('used');
        button.disabled = true;
        
        // Check if letter is in word
        if (!this.word.includes(letter)) {
            this.remainingLives--;
            this.message.textContent = 'Wrong guess!';
        } else {
            this.message.textContent = 'Good guess!';
        }
        
        this.updateDisplay();
        
        // Check win/lose conditions
        if (this.remainingLives === 0) {
            this.message.textContent = `Game Over! The word was: ${this.word}`;
            this.gameOver = true;
        } else if (!this.word.split('').some(letter => !this.guessedLetters.has(letter))) {
            this.message.textContent = 'Congratulations! You won!';
            this.gameOver = true;
        }
    }
    
    async loadWords() {
        try {
            const response = await fetch('words.txt');
            const text = await response.text();
            this.words = text.split('\n').filter(word => word.trim() !== '');
            this.newGame(); // Start new game only after words are loaded
        } catch (error) {
            console.error('Error loading words:', error);
            this.words = ['hangman'];
            this.newGame(); // Start new game with fallback word
        }
    }
}

// Start the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.hangmanGame = new HangmanGame();
}); 