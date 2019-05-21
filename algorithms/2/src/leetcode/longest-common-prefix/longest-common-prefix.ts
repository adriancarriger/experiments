export default (inputs: string[]) => {
  if (inputs.length === 0) {
    return '';
  }

  let common = inputs[0];

  for (let i = 1; i < inputs.length; i++) {
    common = getCommonPrefix(common, inputs[i]);
  }

  return common;
};

function getCommonPrefix(input1: string, input2: string) {
  for (let j = 0; j < input1.length; j++) {
    if (input1[j] !== input2[j]) {
      return input1.slice(0, j);
    }
  }

  return input1;
}
