/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
export default (nums, target) => {
  const world = {};

  for (let i = 0; i < nums.length; i++) {
    const friend = target - nums[i];
    if (friend in world) {
      return [world[friend], i];
    }

    world[nums[i]] = i;
  }
};
