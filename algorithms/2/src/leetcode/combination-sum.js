const numberSort = (a, b) => a - b;

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */

const combinationSum = (candidates, target) => {
  const results = [];
  const current = [];

  const explore = (depth = 0, sum = 0) => {
    if (sum > target) {
      return;
    }

    if (sum === target) {
      return results.push([...current]);
    }

    for (let i = depth; i < candidates.length; i++) {
      current.push(candidates[i]);

      explore(i, sum + candidates[i]);

      current.pop();
    }
  };

  explore();

  return results;
};
