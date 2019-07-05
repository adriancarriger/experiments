/**
 * @param {number} candies
 * @param {number} num_people
 * @return {number[]}
 */
export default (candies, num_people) => {
  const result = Array(num_people).fill(0);
  const current = { amount: 1, index: 0 };

  while (candies > 0) {
    if (candies < current.amount) {
      current.amount = candies;
    }
    result[current.index] += current.amount;
    candies -= current.amount;

    current.amount++;
    current.index++;

    if (current.index === num_people) {
      current.index = 0;
    }
  }

  return result;
};
