/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
export default (nums, k) => {
  const frequency = {};
  for (let i = 0; i < nums.length; i++) {
    frequency[nums[i]] = (frequency[nums[i]] || 0) + 1;
  }

  return Object.keys(frequency)
    .sort((a, b) => frequency[b] - frequency[a])
    .slice(0, k)
    .map(Number);
};
