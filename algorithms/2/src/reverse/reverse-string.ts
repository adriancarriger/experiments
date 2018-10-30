export default (input: string[], first = 0, last = input.length - 1) => {
  for (; first < last; first++, last--) {
    [input[first], input[last]] = [input[last], input[first]];
  }
};
