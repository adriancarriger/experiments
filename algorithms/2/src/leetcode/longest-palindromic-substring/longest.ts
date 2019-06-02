export default (input: string) => {
  let longest = '';
  const updateLongest = input => {
    if (input.length > longest.length) {
      longest = input;
    }
  };

  for (let i = 0; i < input.length; i++) {
    updateLongest(longestFromCenter(input, i, i));
    updateLongest(longestFromCenter(input, i, i + 1));
  }

  return longest;
};

function longestFromCenter(input, leftPointer, rightPointer) {
  let longest = '';
  while (input[leftPointer] && input[rightPointer] && input[leftPointer] === input[rightPointer]) {
    longest = input[leftPointer] + longest;
    if (leftPointer !== rightPointer) {
      longest += input[rightPointer];
    }

    leftPointer--;
    rightPointer++;
  }

  return longest;
}
