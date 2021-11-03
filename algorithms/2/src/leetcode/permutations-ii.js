const getCount = (items) =>
  items.reduce(
    (previous, current) => ({ ...previous, [current]: (previous[current] || 0) + 1 }),
    {}
  );

const permuteUnique = (numbers) => {
  const results = [];
  const current = [];

  const count = getCount(numbers);
  const uniqueNumbers = [...new Set(numbers)];

  const explore = () => {
    if (current.length === numbers.length) {
      return results.push([...current]);
    }

    uniqueNumbers.forEach((uniqueNumber) => {
      if (count[uniqueNumber] > 0) {
        count[uniqueNumber]--;
        current.push(uniqueNumber);

        explore();

        count[uniqueNumber]++;
        current.pop();
      }
    });
  };

  explore();

  return results;
};
