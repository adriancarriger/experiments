import { aVeryBigSum, diagonalDifference, plusMinus } from './quick';

describe('...', () => {
  it('...', () => {
    const result = aVeryBigSum([1000000001, 1000000002, 1000000003, 1000000004, 1000000005]);
    expect(result).toEqual(5000000015);
  });

  it('...', () => {
    const result = diagonalDifference([[11, 2, 4], [4, 5, 6], [10, 8, -12]]);
    expect(result).toEqual(15);
  });

  it('...', () => {
    const result = plusMinus([-4, 3, -9, 0, 4, 1]);
    expect(result).toEqual([0.5, 0.3333333333333333, 0.16666666666666666]);
  });
});
