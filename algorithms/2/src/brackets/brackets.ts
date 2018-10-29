export default (input: string) => {
  const bracketMap = {
    '(': ')',
    '{': '}',
    '[': ']'
  };
  const closers = Object.values(bracketMap);
  const stack = [];

  for (let i = 0; i < input.length; i++) {
    if (input[i] in bracketMap) {
      stack.push(bracketMap[input[i]]);
    }

    if (closers.includes(input[i]) && stack.pop() !== input[i]) {
      return false;
    }
  }

  return stack.length === 0;
};
