/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
const exist = (board, word) => {
  const cellFilter = ({ i, j }) => i >= 0 && i < board.length && j >= 0 && j < board[0].length;
  const getCells = ({ i, j }) =>
    [
      { i: i + 1, j },
      { i: i - 1, j },
      { i, j: j + 1 },
      { i, j: j - 1 },
    ].filter(cellFilter);

  let found = false;
  const seen = new Set();

  const explore = ({ i, j }, depth = 0) => {
    if ((depth === 0 && board[i][j] === word) || depth === word.length) {
      found = true;
      return;
    }

    const key = `${i}, ${j}`;

    if (seen.has(key) || found || board[i][j] !== word[depth]) {
      return;
    }

    seen.add(key);
    getCells({ i, j }).forEach((cell) => explore(cell, depth + 1));
    seen.delete(key);
  };

  for (let i = 0; i < board.length && !found; i++) {
    for (let j = 0; j < board[0].length && !found; j++) {
      explore({ i, j });
    }
  }

  return found;
};
