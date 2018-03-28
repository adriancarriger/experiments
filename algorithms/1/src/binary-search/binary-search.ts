export function binarySearch(needle, haystack) {
  let index, guess, iterations = 0, min = 0, max = haystack.length - 1;

  while (index === undefined) {
    iterations++;
    guess = Math.floor( (min + max) / 2 );
    if (haystack[guess] === needle) {
      index = guess;
    } else if (needle > haystack[guess]) {
      min = guess + 1;
    } else {
      max = guess - 1;
    }
  }

  return { index, iterations };
}
