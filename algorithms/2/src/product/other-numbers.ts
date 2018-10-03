export function multiplyOtherNumbers(input: number[]) {
  const productOfPreviousIndexies = getProductOfPreviousIndexies(input);
  const inputLength = input.length;

  return input.reverse().reduce((previous, current, index) => {
    const previousProduct = productOfPreviousIndexies[inputLength - index - 1];
    previous.result.unshift(previous.lastProduct * previousProduct);
    previous.lastProduct = previous.lastProduct * current;

    return previous;
  }, accumulator()).result;
}

function getProductOfPreviousIndexies(input: number[]) {
  return input.reduce((previous, current) => {
    previous.result.push(previous.lastProduct);
    previous.lastProduct = previous.lastProduct * current;
    return previous;
  }, accumulator()).result;
}

function accumulator() {
  return { lastProduct: 1, result: [] };
}
