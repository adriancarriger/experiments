export default (input: string, position: number) => {
  let openParenthesis = 0;

  for (let i = position - 1; i < input.length; i++) {
    if (input[i] === '(') {
      openParenthesis++;
    }

    if (input[i] === ')') {
      openParenthesis--;
    }

    if (openParenthesis === 0) {
      return i + 1;
    }
  }

  throw new Error(`Syntax error 😢`);
};
