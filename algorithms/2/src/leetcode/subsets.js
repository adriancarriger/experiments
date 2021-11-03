/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const subsets = (nums) => {
  const results = [];

  const explore = (depth = 0, remaining = nums) => {
    results.push([...remaining]);

    if (remaining === 0) {
      return;
    }

    for (let i = depth; i < remaining.length; i++) {
      explore(i, [...remaining.slice(0, i), ...remaining.slice(i + 1)]);
    }
  };

  explore();

  return results;
};
