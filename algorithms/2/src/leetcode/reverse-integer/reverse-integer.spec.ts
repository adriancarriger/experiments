import reverse from './reverse-integer';

describe('...', () => {
  it('...', () => {
    expect(reverse(123)).toBe(321);
  });

  it('...', () => {
    expect(reverse(-123456)).toBe(-654321);
  });

  it('...', () => {
    expect(reverse(-8463847412)).toBe(-2147483648);
  });

  it('...', () => {
    expect(reverse(-9463847412)).toBe(0);
  });

  it('...', () => {
    expect(reverse(7463847412)).toBe(2147483647);
  });

  it('...', () => {
    expect(reverse(8463847412)).toBe(0);
  });
});
