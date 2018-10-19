const memo = {};

export function getFib(n) {
  if (n < 2) {
    return n;
  }

  if (memo[n]) {
    return memo[n];
  }

  memo[n] = getFib(n - 1) + getFib(n - 2);

  return memo[n];
}
