const cache = {};

const isMatch = (stringInput, pattern) => {
  const key = `${stringInput}:${pattern}`;

  if (key in cache) {
    return cache[key];
  }

  if (!pattern) {
    /**
     * - If both `pattern` and `stringInput` are empty then everything is valid
     * - Remaining characters with no pattern to match against is invalid
     */
    return !stringInput;
  }

  /**
   * - An empty `stringInput` is only valid in the special case with `*`
   * where a pattern can be skipped (which is handled below).
   * - Otherwise, we simply check if the pattern and string characters match or have a wildcard
   */
  const defaultCheck = (...inputs) =>
    !stringInput || (pattern[0] !== stringInput[0] && pattern[0] !== '.')
      ? false
      : isMatch(...inputs);

  /**
   * Check if the next character is a star
   */
  if (pattern[1] === '*') {
    /**
     * - Check if we can skip the current `*` pattern since it requires zero or more matches.
     */
    const canSkipPattern = isMatch(stringInput, pattern.slice(2));

    /**
     * If we can't skip the pattern, then:
     * - defaultCheck if the curent character is valid (via `defaultCheck`)
     * - move the string forward by a character and apply the same pattern (recursively)
     * - after enough recursion it will eventually `canSkipPattern` will be true
     */
    cache[key] = canSkipPattern || defaultCheck(stringInput.slice(1), pattern);
  } else {
    /**
     * - defaultCheck the current pattern against the currrent string
     * - if valid advance both to the next character
     */
    cache[key] = defaultCheck(stringInput.slice(1), pattern.slice(1));
  }

  return cache[key];
};
