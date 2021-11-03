const numberSort = (a, b) => a - b;

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
const combinationSum2 = (candidates, target) => {
  const results = [];
  const current = [];
  candidates.sort(numberSort);

  const explore = (depth = 0, sum = 0) => {
    if (sum > target) {
      return;
    }

    if (sum === target) {
      return results.push([...current]);
    }

    for (let i = depth; i < candidates.length; i++) {
      if (i === depth || candidates[i] !== candidates[i - 1]) {
        current.push(candidates[i]);

        explore(i + 1, sum + candidates[i]);

        current.pop();
      }
    }
  };

  explore();

  return results;
};
