export function aVeryBigSum(input) {
  return input.reduce((p, c) => p + c);
}

export function diagonalDifference(array) {
  const lastIndex = array.length - 1;

  let topLeft = 0;
  let bottomLeft = 0;
  for (let i = 0; i < array.length; i++) {
    topLeft += array[i][i];
    bottomLeft += array[lastIndex - i][i];
  }

  return Math.abs(topLeft - bottomLeft);
}

export function plusMinus(array) {
  return array
    .reduce(
      (previous, current) => {
        if (current > 0) {
          previous[0]++;
        } else if (current < 0) {
          previous[1]++;
        } else {
          previous[2]++;
        }

        return previous;
      },
      [0, 0, 0]
    )
    .map(item => item / array.length);
}
