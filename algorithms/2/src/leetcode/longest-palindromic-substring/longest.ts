export default (input: string) => {
  let longest = input[0] || '';
  for (let i = 0; i < input.length; i++) {
    const longestAtIndex = longestFromIndex(input, i);
    if (longestAtIndex.length > longest.length) {
      longest = longestAtIndex;
    }
  }

  return longest;
};

export function longestFromIndex(input, index) {
  let leftPointer = index;
  let rightPointer = index;
  let longest = input[index];
  let temp = input[index];

  while (true) {
    let foundPalindrome = false;
    if (leftPointer > 0) {
      --leftPointer;
      temp = input[leftPointer] + temp;
      if (isPalindrome(temp)) {
        longest = temp;
        foundPalindrome = true;
      }
    }

    if (rightPointer < input.length - 1) {
      ++rightPointer;
      temp = temp + input[rightPointer];
      if (isPalindrome(temp)) {
        longest = temp;
        foundPalindrome = true;
      }
    }

    if (!foundPalindrome) {
      break;
    }
  }

  return longest;
}

function isPalindrome(input) {
  let leftPointer = 0;
  let rightPointer = input.length - 1;

  while (leftPointer <= rightPointer) {
    if (input[leftPointer] !== input[rightPointer]) {
      return false;
    }
    leftPointer++;
    rightPointer--;
  }

  return true;
}
