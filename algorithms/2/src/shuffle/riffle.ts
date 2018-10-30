export default (input: number[]): boolean => {
  const last = { a: undefined, b: undefined };
  let current = 'a';
  let index = 0;
  let switchedRecently = false;

  while (index < input.length) {
    if (last[current] === undefined || input[index] - last[current] === 1) {
      last[current] = input[index];
      index++;
      switchedRecently = false;
    } else if (!switchedRecently) {
      current = current === 'a' ? 'b' : 'a';
      switchedRecently = true;
    } else {
      return false;
    }
  }

  return true;
};
