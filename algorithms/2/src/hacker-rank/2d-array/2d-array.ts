export default (input: number[][]) => {
  let highestSum;
  for (let row = 0; row < 4; row++) {
    for (let column = 0; column < 4; column++) {
      const sum = getHourGlassSum(row, column, input);
      if (sum > highestSum || highestSum === undefined) {
        highestSum = sum;
      }
    }
  }

  return highestSum;
};

function getHourGlassSum(row, column, input) {
  return (
    input[row][column] +
    input[row][column + 1] +
    input[row][column + 2] +
    input[row + 1][column + 1] +
    input[row + 2][column] +
    input[row + 2][column + 1] +
    input[row + 2][column + 2]
  );
}
