export function reverseWords(message) {
  reverseCharacters(message, 0, message.length - 1);

  let wordStartIndex = 0;
  for (let i = 0; i <= message.length; i++) {
    if (i === message.length || message[i] === ' ') {
      reverseCharacters(message, wordStartIndex, i - 1);
      wordStartIndex = i + 1;
    }
  }
}

function reverseCharacters(array, start, end) {
  while (start < end) {
    swap(array, start, end);
    start++;
    end--;
  }
}

function swap(array, a, b) {
  [array[a], array[b]] = [array[b], array[a]];
}
