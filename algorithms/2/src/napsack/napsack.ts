export function maxDuffelBagValue(cakeTypes: CakeType[], capacity: number): number {
  const maxValues = new Array(capacity + 1).fill(0);

  for (let i = 0; i <= capacity; i++) {
    for (let j = 0; j < cakeTypes.length; j++) {
      if (cakeTypes[j].weight === 0 && cakeTypes[j].value > 0) {
        return Infinity;
      }
      if (cakeTypes[j].weight <= i) {
        const newValue = cakeTypes[j].value + maxValues[i - cakeTypes[j].weight];
        maxValues[i] = Math.max(newValue, maxValues[i]);
      }
    }
  }

  return maxValues[capacity];
}

interface CakeType {
  weight: number;
  value: number;
  ratio?: number;
}
