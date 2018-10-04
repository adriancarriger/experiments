export function isRiffle(shuffledDeck) {
  const lastCard = {};
  let usingFirstHalf = true;

  for (let i = 0; i < shuffledDeck.length; i++) {
    if (isConsecutive(shuffledDeck[i], lastCard, usingFirstHalf)) {
      lastCard[getLastCardKey(usingFirstHalf)] = shuffledDeck[i];
    } else if (isConsecutive(shuffledDeck[i], lastCard, !usingFirstHalf)) {
      usingFirstHalf = !usingFirstHalf;
      lastCard[getLastCardKey(usingFirstHalf)] = shuffledDeck[i];
    } else {
      return false;
    }
  }

  return true;
}

function isConsecutive(currentCard, lastCard, usingFirstHalf) {
  const lastCardIndex = lastCard[getLastCardKey(usingFirstHalf)];
  if (lastCardIndex === undefined) {
    return true;
  }
  return currentCard - lastCardIndex === 1;
}

function getLastCardKey(usingFirstHalf) {
  return `half${usingFirstHalf ? 1 : 2}`;
}

export function shuffle(cards: number[]) {
  const shuffledDeck = [];
  const midpoint = cards.length / 2;
  const half1 = cards.slice(0, midpoint);
  const half2 = cards.slice(midpoint);

  while (half1.length || half2.length) {
    shuffledDeck.push(...takeSomeCards(half1), ...takeSomeCards(half2));
  }

  return shuffledDeck;
}

export function getCards() {
  return [...Array(52).keys()];
}

function takeSomeCards(cards) {
  const numberOfCards = Math.round(Math.random() * cards.length);
  return cards.splice(0, numberOfCards);
}
