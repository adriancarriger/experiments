export default (input: number[]) => {
  input.sort();

  const sum = (start, end) =>
    input
      .slice(start, end)
      .reduce((p, c) => p + c, 0)
      .toString();

  return {
    min: sum(0, 4),
    max: sum(1, 5)
  };
};
