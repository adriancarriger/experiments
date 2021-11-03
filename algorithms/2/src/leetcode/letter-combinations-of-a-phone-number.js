const digitMap = {
  2: ['a', 'b', 'c'],
  3: ['d', 'e', 'f'],
  4: ['g', 'h', 'i'],
  5: ['j', 'k', 'l'],
  6: ['m', 'n', 'o'],
  7: ['p', 'q', 'r', 's'],
  8: ['t', 'u', 'v'],
  9: ['w', 'x', 'y', 'z'],
};

/**
 * @param {string} digits
 * @return {string[]}
 */
const letterCombinations = (digits) => {
  const results = [];
  const validDigits = digits.split('').filter((digit) => digit >= 2 && digit <= 9);

  const explore = (depth = 0, current = []) => {
    if (depth === validDigits.length) {
      if (current.length > 0) {
        results.push(current.join(''));
      }

      return;
    }

    const validDigit = validDigits[depth];
    digitMap[validDigit].forEach((letter) => {
      explore(depth + 1, [...current, letter]);
    });
  };

  explore();

  return results;
};
