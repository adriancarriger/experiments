const cache = {};

const isMatch = (stringInput, pattern) => {
  if (!pattern && !stringInput) {
    return true;
  }

  const key = `${stringInput}:${pattern}`;

  if (key in cache) {
    return cache[key];
  }

  const valid = stringInput && (stringInput[0] === pattern[0] || pattern[0] === '.');

  if (pattern[1] === '*') {
    const canSkip = isMatch(stringInput, pattern.slice(2));

    cache[key] = canSkip || (valid && isMatch(stringInput.slice(1), pattern));
  } else {
    cache[key] = valid && isMatch(stringInput.slice(1), pattern.slice(1));
  }

  return cache[key];
};
