export function selectionSort(array) {
  let lowestIndex = 0;
  for (let index = 0; index < array.length; index++) {
    lowestIndex = index
    for (let subIndex = index + 1; subIndex < array.length; subIndex++) {
      if (array[subIndex] < array[lowestIndex]) {
        lowestIndex = subIndex
      }
    }
    
    if (lowestIndex !== index) { swap(array, index, lowestIndex); }
  }

  return array;
}

function swap(array, index1, index2) {
  const originalIndex1 = array[index1];
  array[index1] = array[index2];
  array[index2] = originalIndex1;
}
