import { containsTwoValidLengths } from './valid-lengths';

describe('...', () => {
  it('...', () => {
    expect(containsTwoValidLengths(100, [50, 49, 51])).toBe(true);
  });

  it('...', () => {
    expect(containsTwoValidLengths(100, [2, 3, 98])).toBe(true);
  });

  it('...', () => {
    expect(containsTwoValidLengths(100, [98, 3, 2])).toBe(true);
  });

  it('...', () => {
    expect(containsTwoValidLengths(100, [1, 2, 97])).toBe(false);
  });

  it('...', () => {
    expect(containsTwoValidLengths(100, [100, 1, 34])).toBe(false);
  });

  it('...', () => {
    expect(containsTwoValidLengths(100, [123, 13, 3])).toBe(false);
  });

  it('...', () => {
    expect(containsTwoValidLengths(100, [1])).toBe(false);
  });

  it('...', () => {
    expect(containsTwoValidLengths(100, [])).toBe(false);
  });

  it('...', () => {
    expect(containsTwoValidLengths(100, [999, 1])).toBe(false);
  });

  it('...', () => {
    expect(containsTwoValidLengths(2, [1, 1])).toBe(true);
  });

  it('...', () => {
    expect(containsTwoValidLengths(100, [50])).toBe(false);
  });
});
