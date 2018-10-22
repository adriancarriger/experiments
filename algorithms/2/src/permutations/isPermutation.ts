export function isPermutation(a: string, b: string) {
  return sortString(a) === sortString(b);
}

function sortString(input: string) {
  return input
    .split('')
    .sort()
    .join('');
}
