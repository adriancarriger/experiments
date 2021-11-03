/**
 * @param {number[][]} grid
 * @return {number}
 */
const orangesRotting = (grid) => {
  const nodes = [];
  const getFourDirectionalNodes = (input) =>
    [
      { ...input, x: input.x + 1 },
      { ...input, x: input.x - 1 },
      { ...input, y: input.y + 1 },
      { ...input, y: input.y - 1 },
    ].filter(({ x, y }) => x >= 0 && y >= 0 && x < grid.length && y < grid[0].length);

  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[0].length; y++) {
      if (grid[x][y] === 2) {
        nodes.push({ x, y });
      }
    }
  }

  let max = 0;

  while (nodes.length) {
    const { x, y } = nodes.shift();

    const sideNodes = getFourDirectionalNodes({ x, y });
    sideNodes.forEach((sideNode) => {
      if (grid[sideNode.x][sideNode.y] === 1) {
        nodes.push(sideNode);
      }
    });

    if (grid[x][y] !== 2) {
      const sideValues = sideNodes
        .map((sideNode) => grid[sideNode.x][sideNode.y])
        .filter((sideNode) => sideNode > 1);

      if (sideValues.length) {
        grid[x][y] = Math.min(...sideValues) + 1;
      }
    }

    max = Math.max(max, grid[x][y]);
  }

  // Check if any fresh remain
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[0].length; y++) {
      if (grid[x][y] === 1) {
        return -1;
      }
    }
  }

  return max ? max - 2 : 0;
};
