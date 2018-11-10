export default (items: Item[], capacity) => {
  const maxAtCapacity = new Array(capacity + 1).fill(0);

  /**
   * If capacity (n) is larger than items (m),
   * then optimize for fewer itterations of n
   */
  if (capacity > items.length) {
    pruneInvaluableItems(items);
    const fit = checkPerfectFit(items, capacity);
    if (fit.space === 0) {
      // Found a perfect fit
      return fit.value;
    }
  }

  /**
   * Must loop through every discreet value for 0…capacity
   */
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

function checkPerfectFit(items: Item[], capacity) {
  const fit = { value: 0, space: capacity };
  items.sort((a, b) => b.value / b.weight - a.value / a.weight);
  items.forEach(item => {
    const itemsUsed = Math.floor(fit.space / item.weight);
    fit.value += itemsUsed * item.value;
    fit.space -= itemsUsed * item.weight;
    if (fit.space === 0) {
      return;
    }
  });

  return fit;
}

function pruneInvaluableItems(items: Item[]) {
  // Sort by weight ascending, value descending
  items.sort((a, b) => {
    const result = a.weight - b.weight;
    if (result === 0) {
      return b.value - a.value;
    }

    return result;
  });

  for (let larger = items.length - 1; larger > 0; larger--) {
    for (let smaller = 0; smaller < larger; smaller++) {
      if (
        divisibleBySmaller(items[smaller], items[larger]) &&
        smallerIsMoreValuable(items[smaller], items[larger])
      ) {
        items.splice(larger, 1);
        break;
      }
    }
  }
}

function divisibleBySmaller(smaller: Item, larger: Item) {
  return larger.weight % smaller.weight === 0;
}

function smallerIsMoreValuable(smaller: Item, larger: Item) {
  return smaller.value > larger.value / smaller.weight;
}

interface Item {
  weight: number;
  value: number;
}
