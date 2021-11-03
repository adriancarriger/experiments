/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const search = (nums, target) => {
  let minIndex = 0;
  let maxIndex = nums.length - 1;

  while (minIndex <= maxIndex) {
    const middleIndex = minIndex + Math.round(maxIndex - minIndex / 2);

    if (target === nums[middleIndex]) {
      return middleIndex;
    }

    if (target > nums[middleIndex]) {
      minIndex = middleIndex + 1;
    } else {
      maxIndex = middleIndex - 1;
    }
  }

  return -1;
};
