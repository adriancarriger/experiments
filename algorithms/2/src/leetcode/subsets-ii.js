/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const subsetsWithDup = (nums) => {
  const results = [];
  const current = [];
  nums.sort((a, b) => a - b);

  const explore = (depth = 0, remaining = nums) => {
    results.push([...current]);

    for (let i = depth; i < remaining.length; i++) {
      if (i === 0 || remaining[i] !== remaining[i - 1]) {
        current.push(remaining[i]);

        explore(i, [...remaining.slice(0, i), ...remaining.slice(i + 1)]);

        current.pop();
      }
    }
  };

  explore();

  return results;
};
