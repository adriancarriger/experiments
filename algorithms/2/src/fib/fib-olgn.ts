// O(lg(n))
export function getFib(n) {
  const a = [[1, 1], [1, 0]];
  const aToTheN = powerMatrix(a, n);
  const start = [[1], [0]];
  const end = multiplyMatrix(aToTheN, start);

  return end[1][0];
}

function multiplyMatrix(Matrix1, Matrix2) {
  // prettier-ignore
  const [
    [a1, b1],
    [c1, d1]
  ]: number[][] = Matrix1;
  // prettier-ignore
  const [
    [a2, b2],
    [c2, d2]
  ]: number[][] = Matrix2;

  return [[a1 * a2 + b1 * c2, a1 * b2 + b1 * d2], [c1 * a2 + d1 * c2, c1 * b2 + d1 * d2]];
}

function powerMatrix(a, n) {
  if (n == 1) {
    return a;
  }
  const half = powerMatrix(a, (n - (n % 2)) / 2);
  let ret = multiplyMatrix(half, half);
  if (n % 2) {
    ret = multiplyMatrix(ret, a);
  }

  return ret;
}
