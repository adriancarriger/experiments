/**
 * @param {string} s
 * @return {string}
 */
const wordMap = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const entries = [
  // unique
  ['z', 'zero'],
  ['w', 'two'],
  ['x', 'six'],
  ['u', 'four'],
  ['g', 'eight'],

  // unique afterr unique
  ['s', 'seven'],
  ['r', 'three'],
  ['v', 'five'],
  ['o', 'one'],

  // remaining
  ['i', 'nine'],
];

const originalDigits = (s) => {
  const results = [];
  const hash = {};

  for (let i = 0; i < s.length; i++) {
    const character = s[i];
    hash[character] = (hash[character] || 0) + 1;
  }

  entries.forEach(([letter, word]) => {
    while (letter in hash && hash[letter] > 0) {
      // decrement letters from word match
      for (let i = 0; i < word.length; i++) {
        hash[word[i]] -= 1;
      }

      results[wordMap[word]] = (results[wordMap[word]] || 0) + 1;
    }
  });

  return results.map((amount, index) => Array(amount).fill(index).join('')).join('');
};
