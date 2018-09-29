function mergeSortedArrays(...sortedArrays) {
  return [].concat(...sortedArrays).reduce((store) => {
    const arrayIndex = smallestArrayIndex(sortedArrays, store.indexies);
    store.sortedArray.push(sortedArrays[arrayIndex][store.indexies[arrayIndex]])
    store.indexies[arrayIndex] += 1;

    return store;
  }, initialStore(sortedArrays)).sortedArray;
}

function smallestArrayIndex(sortedArrays, indexies) {
  return sortedArrays.reduce((previous, current, index) => {
    if (current[indexies[index]] < previous.value) {
      previous = {
        index,
        value: current[indexies[index]]
      };
    }

    return previous;
  }, {
    value: Infinity
  }).index;
}

function initialStore(sortedArrays) {
  return {
    sortedArray: [],
    indexies: initialIndexies(sortedArrays)
  }
}

function initialIndexies(sortedArrays) {
  return sortedArrays.reduce((previous, current, index) => {
    previous[index] = 0;
    return previous;
  }, {});
}

// Tests
let actual, expected;

actual = mergeSortedArrays([], []);
expected = [];
assertEqual(actual, expected);

actual = mergeSortedArrays([], [1, 2, 3]);
expected = [1, 2, 3];
assertEqual(actual, expected);

actual = mergeSortedArrays([5, 6, 7], []);
expected = [5, 6, 7];
assertEqual(actual, expected);

actual = mergeSortedArrays([2, 4, 6], [1, 3, 7]);
expected = [1, 2, 3, 4, 6, 7];
assertEqual(actual, expected);

actual = mergeSortedArrays([2, 4, 6, 8], [1, 7]);
expected = [1, 2, 4, 6, 7, 8];
assertEqual(actual, expected);

actual = mergeSortedArrays([3, 4, 6, 10, 11, 15], [1, 5, 8, 12, 14, 19]);
expected = [1, 3, 4, 5, 6, 8, 10, 11, 12, 14, 15, 19];
assertEqual(actual, expected);

actual = mergeSortedArrays([-3, 4], [3, 4, 6, 10, 11, 15], [1, 5, 8, 12, 14, 19]);
expected = [-3, 1, 3, 4, 4, 5, 6, 8, 10, 11, 12, 14, 15, 19];
assertEqual(actual, expected);

actual = mergeSortedArrays([-3, 10], [2, 5], [1, 4], [9, 11]);
expected = [-3, 1, 2, 4, 5, 9, 10, 11];
assertEqual(actual, expected);

actual = mergeSortedArrays([-3, -5], [-100, -2], [1, 4], [9, 11]);
expected = [-100, -3, -5, -2, 1, 4, 9, 11];
assertEqual(actual, expected);

function assertEqual(item1, item2) {
  const actual = JSON.stringify(item1);
  const pass = actual === JSON.stringify(item2);
  console.log(pass ? 'Pass' : `Fail - ${actual}`);
}
