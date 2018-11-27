import compareTriplets from './triplets';

describe('...', () => {
  it('...', () => {
    const result = compareTriplets([5, 6, 7], [3, 6, 10]);
    expect(result).toEqual([1, 1]);
  });

  it('...', () => {
    const result = compareTriplets([17, 28, 30], [99, 16, 8]);
    expect(result).toEqual([2, 1]);
  });
});
