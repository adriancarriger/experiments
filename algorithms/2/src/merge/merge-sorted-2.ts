export default (...arrays: number[][]) => {
  // return arrays.reduce((p, c) => [...p, ...c], []).sort((a, b) => a - b); // O(nlgn) 👎

  const pointers = new Array(arrays.length).fill(0);
  const mergedArray = [];

  while (arrays.length > 1) {
    const lowest = { index: undefined, value: undefined };
    const arraysToRemove = [];
    arrays.forEach((array, index) => {
      if (pointers[index] >= array.length) {
        arraysToRemove.push(index);
      } else {
        if (lowest.index === undefined || array[pointers[index]] < lowest.value) {
          lowest.value = array[pointers[index]];
          lowest.index = index;
        }
      }
    });

    if (lowest.value) {
      mergedArray.push(lowest.value);
      pointers[lowest.index]++;
    }

    arraysToRemove
      .sort((a, b) => a - b)
      .reverse()
      .forEach(index => {
        arrays.splice(index, 1);
        pointers.splice(index, 1);
      });
  }

  if (arrays.length === 1) {
    mergedArray.push(...arrays[0].slice(pointers[0]));
  }

  return mergedArray;
};
