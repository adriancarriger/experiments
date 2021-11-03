const getCount = (items) =>
  items.reduce(
    (previous, current) => ({ ...previous, [current]: (previous[current] || 0) + 1 }),
    {}
  );

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const permute = (nums) => {
  const results = [];
  const current = [];

  const count = getCount(nums);

  const explore = () => {
    if (current.length === nums.length) {
      return results.push([...current]);
    }

    for (let i = 0; i < nums.length; i++) {
      if (count[nums[i]] > 0) {
        current.push(nums[i]);
        count[nums[i]]--;

        explore();

        current.pop();
        count[nums[i]]++;
      }
    }
  };

  explore();

  return results;
};
