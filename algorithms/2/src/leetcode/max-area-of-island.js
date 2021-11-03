/**
 * @param {number[][]} grid
 * @return {number}
 */
const maxAreaOfIsland = (grid) => {
  const seen = new Set();
  const nodes = [];
  const maxY = grid[0].length;
  const maxX = grid.length;
  const add = (next) => {
    if (
      next.x >= 0 &&
      next.y >= 0 &&
      next.x <= maxX &&
      next.y <= maxY &&
      !seen.has(`${next.x}, ${next.y}`) &&
      grid[x]?.[y]
    ) {
      nodes.push(next);
    }
  };

  let max = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      add({ x: i, y: j });
      let count = 0;

      while (nodes.length) {
        const { x, y } = nodes.shift();
        const key = `${x}, ${y}`;

        if (grid[x]?.[y] && !seen.has(key)) {
          seen.add(key);
          count++;

          add({ x: x + 1, y });
          add({ x: x - 1, y });
          add({ x, y: y + 1 });
          add({ x, y: y - 1 });
        }
      }

      max = Math.max(max, count);
    }
  }

  return max;
};
