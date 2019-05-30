export default (input: string) => {
  let longest = input[0] || '';
  for (let i = 0; i < input.length - 1; i++) {
    const longestAtIndex = longestFromIndex(input, i);
    if (longestAtIndex.length > longest.length) {
      longest = longestAtIndex;
    }
  }

  return longest;
};

function longestFromIndex(input, index) {
  let max = 0;
  let min = 0;
  for (let j = 0; j < input.length - index; j++) {
    if (input[index + j] === input[index - j]) {
      max = j;
      min = j;
    } else {
      break;
    }
  }

  if (monoLetterWord(input.slice(index - min, index + max + 1))) {
    max = max + (input[index] === input[index + max + 1] ? 1 : 0);
    min = min + (input[index] === input[index - min - 1] ? 1 : 0);
  }

  return input.slice(index - min, index + max + 1);
}

function monoLetterWord(input) {
  let lastLetter = input[0];
  for (let i = 1; i < input.length; i++) {
    if (input[i] !== lastLetter) {
      return false;
    }

    lastLetter = input[i];
  }

  return true;
}
