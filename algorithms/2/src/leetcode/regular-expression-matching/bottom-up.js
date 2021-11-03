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
        const zeroOcurrnces = cache.get(-2, 0);

        const possibleRepeatMatch = isValidDefault({
          pattern: previous.pattern,
          string: current.string,
        });
        const isRepeatMatch = possibleRepeatMatch && cache.get(0, -1);

        cache.set(zeroOcurrnces || isRepeatMatch);
      } else {
        const isValid = isValidDefault(current);

        cache.set(isValid && cache.get(-1, -1));
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
                if (innerIndex === 0 && outerIndex > 0) {
                  return outerIndex === 1 ? '' : stringInput[outerIndex - 2];
                }

                return value;
              })
      );
  }
};
