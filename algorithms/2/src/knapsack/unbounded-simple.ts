export default (cakeTypes: CakeType[], capacity) => {
  const maxAtCapacity = new Array(capacity + 1).fill(0);

  for (let i = 0; i <= capacity; i++) {
    for (let j = 0; j < cakeTypes.length; j++) {
      if (cakeTypes[j].weight === 0 && cakeTypes[j].value > 0) {
        return Infinity;
      }
      if (cakeTypes[j].weight <= i) {
        maxAtCapacity[i] = Math.max(
          maxAtCapacity[i],
          cakeTypes[j].value + maxAtCapacity[i - cakeTypes[j].weight]
        );
      }
    }
  }

  return maxAtCapacity[capacity];
};

interface CakeType {
  weight: number;
  value: number;
}
