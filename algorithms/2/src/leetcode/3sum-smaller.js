/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const threeSumSmaller = (nums, target) => {
  nums.sort((a, b) => a - b);
  let sum = 0;

  for (let i = 0; i < nums.length; i++) {
    let j = i + 1;
    let k = nums.length - 1;

    while (j < k) {
      if (nums[i] + nums[j] + nums[k] < target) {
        sum += k - j;
        j += 1;
      } else {
        k -= 1;
      }
    }
  }

  return sum;
};
