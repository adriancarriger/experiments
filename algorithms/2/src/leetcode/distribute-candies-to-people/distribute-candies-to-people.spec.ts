import distributeCandies from './distribute-candies-to-people';

describe('...', () => {
  it('...', () => {
    expect(distributeCandies(7, 4)).toEqual([1, 2, 3, 1]);
  });

  it('...', () => {
    expect(distributeCandies(10, 3)).toEqual([5, 2, 3]);
  });

  it('...', () => {
    expect(distributeCandies(1, 3)).toEqual([1, 0, 0]);
  });

  it('...', () => {
    expect(distributeCandies(0, 3)).toEqual([0, 0, 0]);
  });

  it('...', () => {
    expect(distributeCandies(0, 0)).toEqual([]);
  });
});
