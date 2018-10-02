export function countWords(input: string) {
  return normalizeInput(input)
    .split(' ')
    .reduce((previous, current) => {
      previous.set(current, (previous.get(current) || 0) + 1);
      return previous;
    }, new Map());
}

function normalizeInput(input) {
  return input
    .split(/['.:;?!~,`"&|()<>{}\[\]\r\n/\\]+/)
    .join('')
    .toLowerCase();
}
