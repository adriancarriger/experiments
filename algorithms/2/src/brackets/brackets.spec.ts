import brackets from './brackets';

describe('…', () => {
  it('…', () => {
    expect(brackets('{my(test[🙂]) test}')).toBe(true);
  });

  it('…', () => {
    expect(brackets('{my(test[😢) test}')).toBe(false);
  });

  it('…', () => {
    expect(brackets('my test 😳 test]')).toBe(false);
  });

  it('…', () => {
    expect(brackets('my test 😐 test')).toBe(true);
  });

  it('…', () => {
    expect(brackets('{ [ ] ( ) }')).toBe(true);
  });

  it('…', () => {
    expect(brackets('{ [ ( ] ) }')).toBe(false);
  });

  it('…', () => {
    expect(brackets('{ [ }')).toBe(false);
  });
});
