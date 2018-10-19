export function maxDuffelBagValue(cakeTypes: CakeType[], capacity: number): number {
  const maxValues = new Array(capacity + 1).fill(0);

  for (let i = 0; i <= capacity; i++) {
    for (let t = 0; t < cakeTypes.length; t++) {
      if (cakeTypes[t].weight === 0 && cakeTypes[t].value > 0) {
        return Infinity;
      }
      if (cakeTypes[t].weight <= i) {
        const newValue = cakeTypes[t].value + maxValues[i - cakeTypes[t].weight];
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
