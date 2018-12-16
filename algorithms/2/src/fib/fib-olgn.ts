// O(lg(n))
export default n => (n < 2 ? n : raise([1, 1, 0], n - 1)[0]);

const memo = {};

function multiply(...matrices) {
  return matrices.reduce(([a, b, c], [d, e, f]) => [a * d + b * e, a * e + b * f, b * e + c * f]);
}

function raise(matrix, n) {
  if (n === 1) {
    return matrix;
  }

  if (memo[n] !== undefined) {
    return memo[n];
  }

  const halves = raise(matrix, Math.floor(n / 2));
  const items = [halves, halves];

  if (n % 2 !== 0) {
    items.push(matrix);
  }

  return (memo[n] = multiply(...items));
}
