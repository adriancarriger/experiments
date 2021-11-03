/**
 * @param {string} s
 * @return {number}
 */
const numDecodings = (s) => {
  const memo = {};

  const explore = (input = s) => {
    if (input === '') {
      return 1;
    }

    if (input in memo) {
      return memo[input];
    }

    memo[input] = 0;

    if (input.length >= 2) {
      const double = Number(input.slice(0, 2));

      if (double > 9 && double <= 26) {
        memo[input] += explore(input.slice(2));
      }
    }

    const single = Number(input.slice(0, 1));

    if (single > 0) {
      memo[input] += explore(input.slice(1));
    }

    return memo[input];
  };

  return explore();
};
