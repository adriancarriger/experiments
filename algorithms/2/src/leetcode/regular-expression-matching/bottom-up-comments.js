const isMatch = (stringInput, pattern) => {
  const state = initState();

  for (let j = 0; j < stringInput.length + 1; j++) {
    for (let i = 0; i < pattern.length + 1; i++) {
      const cache = {
        get: (x, y) => {
          const rowIndex = j + y + 1;
          const columnIndex = i + x + 1;

          if (rowIndex < 1) {
            return undefined;
          }

          return state[rowIndex][columnIndex] || false;
        },
        set: (cacheValue) => {
          state[j + 1][i + 1] = cacheValue;
        },
      };

      const current = { pattern: state[0][i + 1], string: state[j + 1][0] };
      const previous = { pattern: state[0][i] };

      const isValidDefault = (input) => input.pattern === input.string || input.pattern === '.';

      if (current.pattern === '') {
        cache.set(current.string === '');
      } else if (current.pattern === '*') {
        /**
         * Does the character this star points to indicate a possible match?
         */
        const hasValidDefault = isValidDefault({
          pattern: previous.pattern,
          string: current.string,
        });

        /**
         * If this is a possible match, did the previous character in this string
         * match this star pattern as well?
         */
        const lastCharacterMatchesStarPattern = cache.get(0, -1);

        const validStarPattern = hasValidDefault && lastCharacterMatchesStarPattern;

        /**
         * Would this be valid if the star pattern matches zero times?
         */
        const validWithZeroMatches = cache.get(-2, 0);

        cache.set(validStarPattern || validWithZeroMatches);
      } else {
        cache.set(isValidDefault(current) && cache.get(-1, -1));
      }
    }
  }

  console.table(state);

  return state[stringInput.length + 1][pattern.length + 1];

  function initState() {
    return Array(stringInput.length + 2)
      .fill(undefined)
      .map((_, outerIndex) =>
        outerIndex === 0
          ? [undefined, '', ...pattern.split('')]
          : Array(pattern.length + 2)
              .fill(undefined)
              .map((value, innerIndex) => {
                if (outerIndex > 0 && innerIndex === 0) {
                  return outerIndex === 1 ? '' : stringInput[outerIndex - 2];
                }

                return value;
              })
      );
  }
};
