export default (input: number) => {
  return (
    input
      .toString()
      .split('')
      .reverse()
      .join('') === input.toString()
  );
};
