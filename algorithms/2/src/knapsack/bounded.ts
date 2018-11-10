export default (items: Item[], capacity) => {
  const maxAtCapacity = [{ value: 0, indicesUsed: [] }];

  for (let i = 0; i <= capacity; i++) {
    if (maxAtCapacity[i] === undefined) {
      maxAtCapacity[i] = { ...maxAtCapacity[i - 1] };
    }
    for (let j = 0; j < items.length; j++) {
      if (items[j].weight <= i) {
        const remainder = i - items[j].weight;
        if (!maxAtCapacity[remainder].indicesUsed.includes(j)) {
          const possibleNextValue = maxAtCapacity[remainder].value + items[j].value;
          if (possibleNextValue > maxAtCapacity[i].value) {
            maxAtCapacity[i].value = possibleNextValue;
            maxAtCapacity[i].indicesUsed = [...maxAtCapacity[remainder].indicesUsed, j];
          }
        }
      }
    }

    // Nothing else can fit in the knapsack 😲!
    if (maxAtCapacity[i].indicesUsed.length === items.length) {
      return maxAtCapacity[i].value;
    }
  }

  return maxAtCapacity[capacity].value;
};

interface Item {
  weight: number;
  value: number;
}
