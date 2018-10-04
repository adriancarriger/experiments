import { isRiffle, shuffle, getCards } from './riffle';

describe('...', () => {
  it('...', () => {
    const cards = getCards();
    const shuffledDeck = shuffle(cards);
    expect(isRiffle(shuffledDeck)).toBe(true);
  });

  it('...', () => {
    const shuffledDeck = [0, 4, 5, 1];
    expect(isRiffle(shuffledDeck)).toBe(true);
  });

  it('...', () => {
    const shuffledDeck = [0, 1, 5];
    expect(isRiffle(shuffledDeck)).toBe(true);
  });

  it('...', () => {
    const shuffledDeck = [0, 1, 5, 0];
    expect(isRiffle(shuffledDeck)).toBe(false);
  });

  it('...', () => {
    const shuffledDeck = [0, 1, 20, 21, 3];
    expect(isRiffle(shuffledDeck)).toBe(false);
  });

  it('...', () => {
    const shuffledDeck = [0, 1, 20, 21, 2, 22];
    expect(isRiffle(shuffledDeck)).toBe(true);
  });

  it('...', () => {
    const shuffledDeck = [0, 1, 20, 21, 2, 22, 24];
    expect(isRiffle(shuffledDeck)).toBe(false);
  });

  it('...', () => {
    const shuffledDeck = [];
    expect(isRiffle(shuffledDeck)).toBe(true);
  });
});
