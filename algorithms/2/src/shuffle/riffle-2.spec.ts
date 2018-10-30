import isRiffle from './riffle-2';

describe('...', () => {
  it('...', () => {
    const half1 = [1, 4, 5];
    const half2 = [2, 3, 6];
    const shuffledDeck = [1, 2, 3, 4, 5, 6];
    expect(isRiffle(half1, half2, shuffledDeck)).toBe(true);
  });

  it('...', () => {
    const half1 = [1, 5];
    const half2 = [2, 3, 6];
    const shuffledDeck = [1, 2, 6, 3, 5];
    expect(isRiffle(half1, half2, shuffledDeck)).toBe(false);
  });

  it('...', () => {
    const half1 = [];
    const half2 = [2, 3, 6];
    const shuffledDeck = [2, 3, 6];
    expect(isRiffle(half1, half2, shuffledDeck)).toBe(true);
  });

  it('...', () => {
    const half1 = [1, 5];
    const half2 = [2, 3, 6];
    const shuffledDeck = [1, 6, 3, 5];
    expect(isRiffle(half1, half2, shuffledDeck)).toBe(false);
  });

  it('...', () => {
    const half1 = [1, 5];
    const half2 = [2, 3, 6];
    const shuffledDeck = [1, 2, 3, 5, 6, 8];
    expect(isRiffle(half1, half2, shuffledDeck)).toBe(false);
  });
});
