export default (input: string[]) => {
  reverseInPlace(input);
  let start = 0;

  for (let i = 0; i <= input.length; i++) {
    if (input[i] === ' ' || i === input.length) {
      reverseInPlace(input, start, i - 1);
      start = ++i;
    }
  }
};

function reverseInPlace(input: string[], first = 0, last = input.length - 1) {
  for (; first < last; first++, last--) {
    [input[first], input[last]] = [input[last], input[first]];
  }
}
