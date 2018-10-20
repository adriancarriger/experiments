export function permutations(input: string, output = '', set = new Set()) {
  if (!input) {
    set.add(output);
  }

  input.split('').forEach((letter, index) => {
    permutations(input.slice(0, index) + input.slice(index + 1), output + letter, set);
  });

  return set;
}
