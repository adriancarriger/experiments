export function getHighestProduct(integers: number[], maxHighest = 3) {
  const { highest, lowest } = getExtreems(integers, maxHighest);

  const positiveProduct = multiply(highest);
  const mixedProducts = getMixedProducts(highest, lowest, maxHighest);

  return Math.max(positiveProduct, ...mixedProducts);
}

function getMixedProducts(highest, lowest, maxHighest) {
  const negatives = makeEven(countNegatives(lowest));
  const result = [];
  for (let i = 2; i <= negatives; i = i + 2) {
    result.push(multiply(getMixed(highest, lowest, maxHighest, i)));
  }

  return result;
}

function getMixed(highest, lowest, maxHighest, maxNegatives) {
  const positives = maxHighest - maxNegatives;
  const result = [];
  for (let i = 0; i < maxNegatives; i++) {
    result.push(lowest[i]);
  }
  for (let i = 0; i < positives; i++) {
    result.push(highest[i]);
  }

  return result;
}

function makeEven(input: number) {
  return input - (input % 2);
}

function countNegatives(lowest) {
  return lowest.reduce((previous, current) => previous + (current < 0 ? 1 : 0), 0);
}

function getExtreems(integers, maxHighest) {
  const maxLowest = makeEven(maxHighest);

  return integers.reduce(
    (previous, current) => {
      updateMax(current, previous.highest, maxHighest, atLeast);
      updateMax(current, previous.lowest, maxLowest, atMost);
      return previous;
    },
    { highest: [], lowest: [] }
  );
}

function updateMax(updateInteger, array, limit, updateFunction) {
  for (let i = 0; i < limit; i++) {
    if (array[i] === undefined || updateFunction(array[i], updateInteger)) {
      array.splice(i, 0, updateInteger);
      array.splice(limit);

      return;
    }
  }
}

function multiply(integers) {
  return integers.reduce((previous, current) => current * previous, 1);
}

function atLeast(previous, current) {
  return current >= previous;
}

function atMost(previous, current) {
  return current <= previous;
}
