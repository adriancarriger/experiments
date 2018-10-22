export function reverseWords(message: string[]) {
  reverseCharacters(message, 0, message.length - 1);
  let start = 0;

  for (let i = 0; i <= message.length; i++) {
    if (i === message.length || message[i] === ' ') {
      reverseCharacters(message, start, i - 1);
      start = ++i;
    }
  }
}

function reverseCharacters(array, start: number, end: number) {
  for (; start < end; start++, end--) {
    [array[start], array[end]] = [array[end], array[start]];
  }
}
