/**
 * @param {number} x
 * @return {number}
 */
export default x => {
  const max = Math.pow(2, 31) - 1;
  const min = Math.pow(-2, 31);
  const newNumber =
    Math.sign(x) *
    Number(
      `${Math.abs(x)}`
        .split('')
        .reverse()
        .join('')
    );
  return newNumber >= min && newNumber <= max ? newNumber : 0;
};
