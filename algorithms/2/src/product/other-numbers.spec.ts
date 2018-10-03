import { multiplyOtherNumbers } from './other-numbers';

describe('...', () => {
  it('...', () => {
    expect(multiplyOtherNumbers([8, 1, 3, 6])).toEqual([18, 144, 48, 24]);
  });

  it('...', () => {
    expect(multiplyOtherNumbers([1, 2, 6, 5, 9])).toEqual([540, 270, 90, 108, 60]);
  });

  it('...', () => {
    expect(multiplyOtherNumbers([1, 2, 0, 5, 9])).toEqual([0, 0, 90, 0, 0]);
  });
});
