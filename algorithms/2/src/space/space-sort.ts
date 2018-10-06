// O(nlgn)
export function findDuplicate(input: number[]) {
  return input.sort().find((value, index, array) => value === array[index - 1]);
}
