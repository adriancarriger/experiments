/**
 * @param {number} n
 * @param {number} k
 * @return {number[]}
 */
const constructArray = (n, k) => {
  let a = 1;
  let z = k + 1;

  return Array(n)
    .fill(0)
    .map((_, index) => (index <= k ? (index % 2 ? z-- : a++) : index + 1));
};
