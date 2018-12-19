// O(lg(n))
export default n => raise([1, 1, 0], n - 1)[0];

const memo = {};

function multiply([a, b, c]: number[], [d, e, f]: number[]) {
  return [a * d + b * e, a * e + b * f, b * e + c * f];
}

function raise(matrix: number[], n: number) {
  if (n === 1) {
    return matrix;
  } else if (memo[n] !== undefined) {
    return memo[n];
  }

  const halves = raise(matrix, Math.floor(n / 2));
  let result = multiply(halves, halves);

  if (n % 2 !== 0) {
    result = multiply(result, matrix);
  }

  return (memo[n] = result);
}
