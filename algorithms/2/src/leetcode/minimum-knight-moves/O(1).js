const minKnightMoves = (x, y) => {
  x = Math.abs(x);
  y = Math.abs(y);

  if (x < y) {
    [x, y] = [y, x];
  }

  if (x === 1 && y === 0) {
    return 3;
  }

  if (x === 2 && y === 2) {
    return 4;
  }

  const delta = x - y;

  return delta - 2 * Math.floor((delta - y) / (y > delta ? 3 : 4));
};
