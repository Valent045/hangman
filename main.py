import random

# List of words to choose from
words = open('words.txt', 'r').read().splitlines()

# Hangman ASCII art states
HANGMAN_STATES = ['''
  +---+
  |   |
      |
      |
      |
      |
=========''', '''
  +---+
  |   |
  O   |
      |
      |
      |
=========''', '''
  +---+
  |   |
  O   |
  |   |
      |
      |
=========''', '''
  +---+
  |   |
  O   |
 /|   |
      |
      |
=========''', '''
  +---+
  |   |
  O   |
 /|\  |
      |
      |
=========''', '''
  +---+
  |   |
  O   |
 /|\  |
 /    |
      |
=========''', '''
  +---+
  |   |
  O   |
 /|\  |
 / \  |
      |
=========''']

def get_word():
    """Return a random word from the word list"""
    return random.choice(words).lower()

def play_game():
    word = get_word()
    word_letters = set(word)  # letters in the word
    alphabet = set('abcdefghijklmnopqrstuvwxyz')
    used_letters = set()  # letters guessed by the user
    
    lives = 6  # number of lives before game over
    
    # Game loop
    while len(word_letters) > 0 and lives > 0:
        print('\nYou have', lives, 'lives left.')
        print('Used letters:', ' '.join(used_letters))
        
        # Show the current word state (e.g. W - R D)
        word_list = [letter if letter in used_letters else '-' for letter in word]
        print('Current word:', ' '.join(word_list))
        print(HANGMAN_STATES[6 - lives])
        
        # Get player input
        guess = input('Guess a letter: ').lower()
        if guess in alphabet - used_letters:
            used_letters.add(guess)
            if guess in word_letters:
                word_letters.remove(guess)
                print('Good guess!')
            else:
                lives = lives - 1
                print('Wrong guess.')
        elif guess in used_letters:
            print('You already used that letter. Try again!')
        else:
            print('Invalid character. Please enter a letter.')
    
    # Game ended
    if lives == 0:
        print(HANGMAN_STATES[6])
        print('Sorry, you died. The word was', word)
    else:
        print('Congratulations! You guessed the word', word)

def main():
    print('Welcome to Hangman!')
    while True:
        play_game()
        if input('Play again? (y/n) ').lower() != 'y':
            break
    print('Thanks for playing!')

if __name__ == '__main__':
    main()

