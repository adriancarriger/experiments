import isRiffle from './riffle';

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

function shuffle(cards: number[]) {
  const shuffledDeck = [];
  const midpoint = cards.length / 2;
  const half1 = cards.slice(0, midpoint);
  const half2 = cards.slice(midpoint);

  while (half1.length || half2.length) {
    shuffledDeck.push(...takeSomeCards(half1), ...takeSomeCards(half2));
  }

  return shuffledDeck;
}

function getCards() {
  return [...Array(52).keys()];
}

function takeSomeCards(cards) {
  const numberOfCards = Math.round(Math.random() * cards.length);
  return cards.splice(0, numberOfCards);
}
