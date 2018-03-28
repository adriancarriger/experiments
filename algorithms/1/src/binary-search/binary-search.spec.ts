import { binarySearch } from './binary-search';

const haystack = [
  2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 
  41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97
];

[
  {needle: 53, expectedIndex: 15, expectedIterations: 3},
  {needle: 97, expectedIndex: 24, expectedIterations: 5},
  {needle: 2, expectedIndex: 0, expectedIterations: 4},
  {needle: 31, expectedIndex: 10, expectedIterations: 4},
  {needle: 5, expectedIndex: 2, expectedIterations: 3}
]
  .forEach(({ needle, expectedIndex, expectedIterations }) => {
    it('should implement binary search',  () => {
      const { index, iterations } = binarySearch(needle, haystack);

      expect(index).toBe(expectedIndex);
      expect(iterations).toBe(expectedIterations);
    });
  });
