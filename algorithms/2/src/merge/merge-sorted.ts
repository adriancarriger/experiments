export function mergeSortedArrays(...sortedArrays) {
  return [].concat(...sortedArrays).reduce(store => {
    const arrayIndex = smallestArrayIndex(sortedArrays, store.indexies);
    store.sortedArray.push(
      sortedArrays[arrayIndex][store.indexies[arrayIndex]]
    );
    store.indexies[arrayIndex] += 1;

    return store;
  }, initialStore(sortedArrays)).sortedArray;
}

function smallestArrayIndex(sortedArrays, indexies) {
  return sortedArrays.reduce(
    (previous, current, index) => {
      if (current[indexies[index]] < previous.value) {
        previous = {
          index,
          value: current[indexies[index]]
        };
      }

      return previous;
    },
    {
      value: Infinity
    }
  ).index;
}

function initialStore(sortedArrays) {
  return {
    sortedArray: [],
    indexies: initialIndexies(sortedArrays)
  };
}

function initialIndexies(sortedArrays) {
  return sortedArrays.reduce((previous, current, index) => {
    previous[index] = 0;
    return previous;
  }, {});
}
