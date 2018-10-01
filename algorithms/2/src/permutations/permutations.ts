export function hasPalindromePermutation(theString) {
  const characterCounts = theString.split('').reduce((previous, current) => {
    previous[current] = previous[current] || 0;
    previous[current] += 1;
    return previous;
  }, {});

  return totalOddCharacters(characterCounts) < 2;
}

function totalOddCharacters(characterCounts) {
  return Object.keys(characterCounts).reduce((previous, current) => {
    if (characterCounts[current] % 2 === 1) {
      previous += 1;
    }
    return previous;
  }, 0);
}
