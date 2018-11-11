import getKthFrequency from './frequency';

describe('…', () => {
  const input = [1, 2, 3, 2, 2, 2, 2, 3];

  it('…', () => {
    expect(getKthFrequency(input, 1)).toBe(2);
  });

  it('…', () => {
    expect(getKthFrequency(input, 2)).toBe(3);
  });

  it('…', () => {
    expect(getKthFrequency(input, 3)).toBe(1);
  });
});

describe('…', () => {
  const input = [4, 4, 1, 2, 3, 4, 0, 6, 7, 8, 9, 0, 0, 0, 2];

  it('…', () => {
    expect(getKthFrequency(input, 1)).toBe(0);
  });

  it('…', () => {
    expect(getKthFrequency(input, 2)).toBe(4);
  });

  it('…', () => {
    expect(getKthFrequency(input, 3)).toBe(2);
  });
});
