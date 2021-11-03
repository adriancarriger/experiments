/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
const updateMatrix = (mat) => {
  const nodes = [];
  const maxX = mat.length - 1;
  const maxY = mat[0].length - 1;

  for (let i = 0; i < mat.length; i++) {
    for (let j = 0; j < mat[0].length; j++) {
      if (mat[i][j] === 0) {
        nodes.push({ x: i, y: j });
      } else {
        mat[i][j] = -1;
      }
    }
  }

  while (nodes.length) {
    const { x, y } = nodes.shift();

    const cordinates = [
      { x: x + 1, y },
      { x: x - 1, y },
      { x, y: y + 1 },
      { x, y: y - 1 },
    ].filter((next) => next.x >= 0 && next.y >= 0 && next.x <= maxX && next.y <= maxY);

    cordinates.forEach((cordinate) => {
      if (mat[cordinate.x][cordinate.y] === -1) {
        nodes.push(cordinate);
      }
    });

    if (mat[x][y] === 0) {
      mat[x][y] = 0;
    } else {
      const nearbyResults = cordinates
        .map((cordinate) => mat[cordinate.x][cordinate.y])
        .filter((result) => result !== -1);

      mat[x][y] = Math.min(...nearbyResults) + 1;
    }
  }

  return mat;
};
