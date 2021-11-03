const bracketMap = {
  '(': ')',
  '{': '}',
  '[': ']',
};

/**
 * @param {string} s
 * @return {boolean}
 */
const isValid = (input) => {
  const stack = [];

  for (let i = 0; i < input.length; i++) {
    if (input[i] in bracketMap) {
      stack.push(bracketMap[input[i]]);
    } else if (stack.pop() !== input[i]) {
      return false;
    }
  }

  return stack.length === 0;
};
