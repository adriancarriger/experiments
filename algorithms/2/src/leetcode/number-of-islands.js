/**
 * @param {character[][]} grid
 * @return {number}
 */
const numIslands = (grid) => {
  const rowLength = grid.length;
  const columnLength = grid[0].length;

  let count = 0;

  // explore other 1's and mark as seen
  const explore = ({ i, j }) => {
    if (i < 0 || j < 0 || i >= rowLength || j >= columnLength) {
      return;
    }

    if (grid[i][j] === '1') {
      grid[i][j] = 2;

      explore({ i: i + 1, j });
      explore({ i: i - 1, j });
      explore({ i, j: j + 1 });
      explore({ i, j: j - 1 });
    }
  };

  for (let i = 0; i < rowLength; i++) {
    for (let j = 0; j < columnLength; j++) {
      if (grid[i][j] === '1') {
        count += 1;
        explore({ i, j });
      }
    }
  }

  return count;
};
