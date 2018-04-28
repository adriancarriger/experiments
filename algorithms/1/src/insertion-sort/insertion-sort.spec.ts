import { insertionSort } from './insertion-sort';

const sortedArray = [
  2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 
  41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97
];

  for (let i = 0; i < 10; i++) {
    it('should implement selection sort',  () => {
      const array = shuffle( Array.from(sortedArray) );
      const result = insertionSort(array);
      expect(array).toEqual(sortedArray)
    });
  }

function shuffle(array) {
  var j, x, i;
  for (i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = array[i];
    array[i] = array[j];
    array[j] = x;
  }

  return array;
}
