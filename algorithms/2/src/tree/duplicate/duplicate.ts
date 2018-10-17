export function findDuplicate(input: number[]): number {
  const n = input.length;

  // Get in a loop
  let current = input[n - 1];
  for (let i = 0; i < n; i++) {
    current = input[current - 1];
  }

  // Count steps in loop
  const itemInLoop = current;
  current = input[current - 1];
  let stepsInLoop = 1;

  while (current !== itemInLoop) {
    current = input[current - 1];
    stepsInLoop++;
  }

  // Start a leader
  let pointerAhead = input[n - 1];
  for (let i = 1; i <= stepsInLoop; i++) {
    pointerAhead = input[pointerAhead - 1];
  }

  // Start a follower with leader
  current = input[n - 1];
  while (pointerAhead !== current) {
    pointerAhead = input[pointerAhead - 1];
    current = input[current - 1];
  }

  return current;
}
