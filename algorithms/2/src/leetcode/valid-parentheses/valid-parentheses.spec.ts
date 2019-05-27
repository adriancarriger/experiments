import isValid from './valid-parentheses';

describe('…', () => {
  it('…', () => {
    expect(isValid('{my(test[🙂]) test}')).toBe(true);
  });

  it('…', () => {
    expect(isValid('{my(test[😢) test}')).toBe(false);
  });

  it('…', () => {
    expect(isValid('my test 😳 test]')).toBe(false);
  });

  it('…', () => {
    expect(isValid('my test 😐 test')).toBe(true);
  });

  it('…', () => {
    expect(isValid('{ [ ] ( ) }')).toBe(true);
  });

  it('…', () => {
    expect(isValid('{ [ ( ] ) }')).toBe(false);
  });

  it('…', () => {
    expect(isValid('{ [ }')).toBe(false);
  });
});
