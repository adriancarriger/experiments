import maxKnapsackValue from './bounded';

describe('...', () => {
  const items = [
    { weight: 3, value: 10 }, // 10 / 3 = 3.33
    { weight: 1, value: 3 }, // 3/ 1 = 3
    { weight: 2, value: 9 }, // 9 / 2 = 4.5
    { weight: 2, value: 5 }, // 5 / 2 = 2.5
    { weight: 1, value: 6 } // 6 / 1 = 6
  ];

  it('...', () => {
    expect(maxKnapsackValue(items, 6)).toBe(25);
  });
});

describe('...', () => {
  const items = [
    { weight: 5, value: 70 }, // 70 / 5 = 14
    { weight: 3, value: 40 }, // 40 / 3 = 13.33
    { weight: 3, value: 40 },
    { weight: 3, value: 40 }
  ];

  it('...', () => {
    expect(maxKnapsackValue(items, 9)).toBe(120);
  });

  it('...', () => {
    expect(maxKnapsackValue(items, 10)).toBe(120);
  });

  it('...', () => {
    expect(maxKnapsackValue(items, 11)).toBe(150);
  });

  it('...', () => {
    expect(maxKnapsackValue(items, 12)).toBe(150);
  });

  it('...', () => {
    expect(maxKnapsackValue(items, 13)).toBe(150);
  });

  it('...', () => {
    expect(maxKnapsackValue(items, 14)).toBe(190);
  });

  it('...', () => {
    expect(maxKnapsackValue(items, 15)).toBe(190);
  });

  it('...', () => {
    expect(maxKnapsackValue(items, 1000)).toBe(190);
  });
});
