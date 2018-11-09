export default input => {
  if (input < 2) {
    return input;
  }

  let lastTwo = [0, 1];
  let value = 1;
  for (let i = 2; i <= input; i++) {
    value = lastTwo[0] + lastTwo[1];
    lastTwo = [lastTwo[1], value];
  }

  return value;
};
