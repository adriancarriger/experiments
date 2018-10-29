export default (input: string): Map<string, number> =>
  input
    .replace(/[,'.():]/g, '')
    .toLowerCase()
    .split(' ')
    .reduce((wordMap, word) => wordMap.set(word, 1 + (wordMap.get(word) || 0)), new Map());
