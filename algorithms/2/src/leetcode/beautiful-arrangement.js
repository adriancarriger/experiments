/**
 * @param {number} n
 * @return {number}
 */
const countArrangement = (n) => {
  const results = [];
  const base = Array(n)
    .fill(0)
    .map((_, index) => index + 1);

  const explore = (index = 0, input = base, output = []) => {
    if (output.length === n) {
      return results.push([...output]);
    }

    for (let i = index; i < input.length; i++) {
      const nextIndex = output.length + 1;

      if (input[i] % nextIndex === 0 || nextIndex % input[i] === 0) {
        explore(index, [...input.slice(0, i), ...input.slice(i + 1)], [...output, input[i]]);
      }
    }
  };

  explore();

  return results.length;
};
