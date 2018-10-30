import reverse from './reverse-string';

describe('Reverse strings', () => {
  let input;

  it('reverses an empty string', () => {
    setInput('');
    reverse(input);
    expect(input.join('')).toBe('');
  });

  it('reverses a single character string', () => {
    setInput('A');
    reverse(input);
    assertInput('A');
  });

  it('reverses a longer string', () => {
    setInput('ABCDE');
    reverse(input);
    assertInput('EDCBA');
  });

  it('reverses parts of a string', () => {
    setInput('123654789');
    reverse(input, 3, 5);
    assertInput('123456789');
  });

  function setInput(inputString: string) {
    input = inputString.split('');
  }

  function assertInput(expected: string) {
    expect(input.join('')).toBe(expected);
  }
});
