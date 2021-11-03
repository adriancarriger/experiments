/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const searchInsert = function (nums, target) {
  let min = 0;
  let max = nums.length - 1;

  while (min <= max) {
    const testIndex = min + Math.floor((max - min) / 2);

    if (nums[testIndex] === target) {
      return testIndex;
    }

    if (target > nums[testIndex]) {
      min = testIndex + 1;
    } else {
      max = testIndex - 1;
    }
  }

  return min;
};
