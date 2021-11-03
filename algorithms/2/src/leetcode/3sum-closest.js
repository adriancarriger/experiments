/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const threeSumClosest = (nums, target) => {
  nums.sort((a, b) => a - b);
  let diff;
  let sum;

  for (let i = 0; i < nums.length && diff !== 0; i++) {
    let j = i + 1;
    let k = nums.length - 1;

    while (j < k) {
      const nextSum = nums[i] + nums[j] + nums[k];
      const nextDiff = Math.abs(target - nextSum);

      if (diff === undefined || nextDiff < diff) {
        diff = nextDiff;
        sum = nextSum;
      }

      if (nextSum > target) {
        k -= 1;
      } else {
        j += 1;
      }
    }
  }

  return sum;
};
