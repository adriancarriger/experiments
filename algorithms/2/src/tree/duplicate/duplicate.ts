export function findDuplicate(input: number[]) {
  const n = input.length;

  // Get in a loop
  let pointer = input[n - 1];
  for (let i = 1; i < input.length; i++) {
    pointer = input[pointer - 1];
  }

  // Count steps in loop
  const endingPosition = pointer;
  pointer = input[pointer - 1];
  let steps = 1;

  while (pointer !== endingPosition) {
    pointer = input[pointer - 1];
    steps++;
  }

  // Start a leader
  let leader = input[n - 1];
  for (let i = 1; i < steps; i++) {
    leader = input[leader - 1];
  }

  // Add a follower
  let follower = n;

  while (follower !== leader) {
    leader = input[leader - 1];
    follower = input[follower - 1];
  }

  return leader;
}
