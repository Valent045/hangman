import random
import re


def generate_word():
    with open('words.txt', 'r') as file:
        words = file.readlines()
    return random.choice(words).strip()


def permutate_word(word1, word2):
    vowels = 'aeiou'
    consonants = 'bcdfghjklmnpqrstvwxyz'
    match1 = re.search(
        f'(?<=[{vowels}])(?P<bp>[{consonants}]{{2,}})',
        word1,
        re.IGNORECASE
    )
    match2 = re.search(
        f'(?<=[{vowels}])(?P<bp>[{consonants}]{{2,}})',
        word2,
        re.IGNORECASE
    )
    if match1 and match2:
        parts1 = word1[:match1.start()] + match1.group('bp')[0], match1.group('bp')[1:] + word1[match1.end():]
        parts2 = word2[:match2.start()] + match2.group('bp')[0], match2.group('bp')[1:] + word2[match2.end():]
        return (
            parts1[0] + parts2[1],
            parts2[0] + parts1[1]
        )


if __name__ == '__main__':
    words = (
        generate_word(),
        generate_word()
    )
    print(words)
    print(permutate_word(*words))

