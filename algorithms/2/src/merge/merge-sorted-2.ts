export default (...arrays: number[][]) => {
  // return arrays.reduce((p, c) => [...p, ...c], []).sort((a, b) => a - b); // O(nlgn) 👎

  const pointers = new Array(arrays.length).fill(0);
  const merged = [];

  while (pointers.some(pointer => pointer !== undefined)) {
    const lowest = { index: undefined, value: undefined };

    pointers.forEach((pointer, index) => {
      if (pointer === undefined) {
        return;
      }

      if (arrays[index].length === pointer) {
        pointers[index] = undefined;
      } else if (lowest.index === undefined || arrays[index][pointer] < lowest.value) {
        lowest.index = index;
        lowest.value = arrays[index][pointer];
      }
    });

    if (lowest.index !== undefined) {
      merged.push(lowest.value);
      pointers[lowest.index]++;
    }
  }

  return merged;
};
