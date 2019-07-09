import flipImage from './flipping-an-image';

describe('...', () => {
  it('...', () => {
    expect(flipImage([[1, 1, 0], [1, 0, 1], [0, 0, 0]])).toEqual([[1, 0, 0], [0, 1, 0], [1, 1, 1]]);
  });

  it('...', () => {
    expect(flipImage([[1, 1, 0, 0], [1, 0, 0, 1], [0, 1, 1, 1], [1, 0, 1, 0]])).toEqual([
      [1, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 1],
      [1, 0, 1, 0]
    ]);
  });
});
