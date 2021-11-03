/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const threeSum = (nums) => {
  const results = [];
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length; i++) {
    /**
     * `i` represents the "left" most number in our sorted set.
     * once this number hits 0, there's no need to go further since
     * positive numbers cannot sum to a negative number
     */
    if (nums[i] > 0) {
      break;
    }

    // We don't want repeats, so skip numbers we've already seen
    if (i === 0 || nums[i - 1] !== nums[i]) {
      const seen = new Set();

      for (let j = i + 1; j < nums.length; j++) {
        const complement = -nums[i] - nums[j];

        if (seen.has(complement)) {
          results.push([nums[i], nums[j], complement]);

          while (j + 1 < nums.length && nums[j] === nums[j + 1]) {
            j += 1;
          }
        }

        seen.add(nums[j]);
      }
    }
  }

  return results;
};
