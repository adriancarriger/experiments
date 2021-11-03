// https://leetcode.com/problems/number-of-unique-good-subsequences/discuss/1432051/DP-O(n)-or-O(1)/
const mod = 1e9 + 7;

const numberOfUniqueGoodSubsequences = (binary) => {
  let endsWithZero = 0;
  let endsWithOne = 0;
  let hasZero = 0;

  for (let i = 0; i < binary.length; i++) {
    if (binary[i] === '1') {
      endsWithOne = (endsWithZero + endsWithOne + 1) % mod;
    } else {
      endsWithZero = (endsWithZero + endsWithOne) % mod;
      hasZero = 1;
    }
  }

  return (endsWithZero + endsWithOne + hasZero) % mod;
};
