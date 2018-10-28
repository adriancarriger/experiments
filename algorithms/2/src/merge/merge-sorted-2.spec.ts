import mergeSortedArrays from './merge-sorted-2';

describe('Merges arrays', () => {
  it('merges an empty array', () => {
    expect(mergeSortedArrays([], [])).toEqual([]);
  });

  it('merges', () => {
    expect(mergeSortedArrays([], [1, 2, 3])).toEqual([1, 2, 3]);
  });

  it('merges', () => {
    expect(mergeSortedArrays([5, 6, 7], [])).toEqual([5, 6, 7]);
  });

  it('merges', () => {
    expect(mergeSortedArrays([2, 4, 6], [1, 3, 7])).toEqual([1, 2, 3, 4, 6, 7]);
  });

  it('merges', () => {
    expect(mergeSortedArrays([2, 4, 6, 8], [1, 7])).toEqual([1, 2, 4, 6, 7, 8]);
  });

  it('merges', () => {
    const actual = mergeSortedArrays([3, 4, 6, 10, 11, 15], [1, 5, 8, 12, 14, 19]);
    expect(actual).toEqual([1, 3, 4, 5, 6, 8, 10, 11, 12, 14, 15, 19]);
  });

  it('merges', () => {
    const actual = mergeSortedArrays([-3, 4], [3, 4, 6, 10, 11, 15], [1, 5, 8, 12, 14, 19]);
    expect(actual).toEqual([-3, 1, 3, 4, 4, 5, 6, 8, 10, 11, 12, 14, 15, 19]);
  });

  it('merges', () => {
    const actual = mergeSortedArrays([-3, 10], [2, 5], [1, 4], [9, 11]);
    expect(actual).toEqual([-3, 1, 2, 4, 5, 9, 10, 11]);
  });

  it('merges', () => {
    const actual = mergeSortedArrays([-5, -3], [-100, -2], [1, 4], [9, 11]);
    expect(actual).toEqual([-100, -5, -3, -2, 1, 4, 9, 11]);
  });
});
