/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
const combine = (n, k, index = 1, current = [], paths = []) => {
  if (current.length === k) {
    paths.push(current);

    return paths;
  }

  for (let i = index; i <= n; i++) {
    combine(n, k, i + 1, [...current, i], paths);
  }

  return paths;
};
