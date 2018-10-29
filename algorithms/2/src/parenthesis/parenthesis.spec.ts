import getParenthesis from './parenthesis';

describe('…', () => {
  it('…', () => {
    const result = getParenthesis('My (test(1))', 4);
    expect(result).toBe(12);
  });

  it('…', () => {
    const result = getParenthesis('My (test(1))', 9);
    expect(result).toBe(11);
  });

  it('…', () => {
    const result = getParenthesis('My (test(1))', 1);
    expect(result).toBe(1);
  });

  it('…', () => {
    expect(() => getParenthesis('My (test(2)', 4)).toThrow;
  });
});
