export function findDuplicate(numbers) {
  const n = numbers.length - 1;
  const sumWithoutDuplicate = (n * n + n) / 2;
  const actualSum = numbers.reduce((previous, current) => previous + current, 0);

  return actualSum - sumWithoutDuplicate;
}
