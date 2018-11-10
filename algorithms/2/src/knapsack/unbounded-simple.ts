export default (items: Item[], capacity) => {
  const maxAtCapacity = new Array(capacity + 1).fill(0);

  for (let i = 0; i <= capacity; i++) {
    for (let j = 0; j < items.length; j++) {
      if (items[j].weight === 0 && items[j].value > 0) {
        return Infinity;
      }
      if (items[j].weight <= i) {
        maxAtCapacity[i] = Math.max(
          maxAtCapacity[i],
          items[j].value + maxAtCapacity[i - items[j].weight]
        );
      }
    }
  }

  return maxAtCapacity[capacity];
};

interface Item {
  weight: number;
  value: number;
}
