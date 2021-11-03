/**
 * @param {number} n
 * @return {string[]}
 */
const generateParenthesis = (n) => {
  const results = [];

  const explore = (left = n, right = n, current = '') => {
    if (current.length === n * 2) {
      return results.push(current);
    }

    if (left) {
      explore(left - 1, right, `${current}(`);
    }

    if (right > left) {
      explore(left, right - 1, `${current})`);
    }
  };

  explore();

  return results;
};
