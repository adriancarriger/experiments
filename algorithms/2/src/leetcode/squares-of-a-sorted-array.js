/**
 * @param {number[]} nums
 * @return {number[]}
 */
const sortedSquares = (nums) => {
  const negative = [];
  const positive = [];

  for (let i = 0; i < nums.length; i++) {
    const next = Math.pow(nums[i], 2);

    if (nums[i] < 0) {
      negative.unshift(next);
    } else {
      positive.push(next);
    }
  }

  const results = [];
  const first = (input) => input[0] ?? Infinity;

  while (negative.length || positive.length) {
    results.push(first(negative) < first(positive) ? negative.shift() : positive.shift());
  }

  return results;
};
