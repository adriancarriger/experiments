export default (half1, half2, shuffledDeck) => {
  const pointers = { half1: 0, half2: 0 };

  for (let i = 0; i < shuffledDeck.length; i++) {
    if (shuffledDeck[i] === half1[pointers.half1]) {
      pointers.half1++;
    } else if (shuffledDeck[i] === half2[pointers.half2]) {
      pointers.half2++;
    } else {
      return false;
    }
  }

  return true;
};
