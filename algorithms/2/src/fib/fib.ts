export function getFib(n) {
  let current = 1;
  let previous = 1;

  if (n < 2) {
    return n;
  }

  for (let i = 2; i < n; i++) {
    const newAmount = current + previous;
    previous = current;
    current = newAmount;
  }

  return current;
}
