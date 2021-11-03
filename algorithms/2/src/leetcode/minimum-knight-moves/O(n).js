const getOptions = ({ x, y, move: moveBasae }) => {
  const move = moveBasae + 1;

  return [
    { move, x: x + 1, y: y + 2 },
    { move, x: x - 1, y: y + 2 },

    { move, x: x + 2, y: y + 1 },
    { move, x: x - 2, y: y + 1 },

    { move, x: x + 2, y: y - 1 },
    { move, x: x - 2, y: y - 1 },

    { move, x: x + 1, y: y - 2 },
    { move, x: x - 1, y: y - 2 },
  ];
};

const minKnightMoves = (x, y) => {
  if (x === 0 && y === 0) {
    return 0;
  }

  const nodes = [{ x: 0, y: 0, move: 0 }];
  const seen = new Set();

  while (nodes.length) {
    const node = nodes.shift();

    const options = getOptions(node);

    for (let i = 0; i < options.length; i++) {
      const option = options[i];

      if (option.x === x && option.y === y) {
        return option.move;
      }

      const key = `${option.x},${option.y}`;

      if (!seen.has(key)) {
        nodes.push(option);
        seen.add(key);
      }
    }
  }
};
