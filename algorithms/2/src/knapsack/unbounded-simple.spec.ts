/**
 * Also known as the 0/1 knapsack problem
 * @see https://en.wikipedia.org/wiki/Knapsack_problem#0/1_knapsack_problem
 */
import maxKnapsackValue from './unbounded-simple';

describe('...', () => {
  // You can't use the max value/weight 🙂
  const items = [{ weight: 5, value: 70 }, { weight: 3, value: 40 }];
  it('...', () => {
    expect(maxKnapsackValue(items, 9)).toBe(120);
  });

  it('...', () => {
    expect(maxKnapsackValue(items, 10)).toBe(140);
  });

  it('...', () => {
    expect(maxKnapsackValue(items, 8)).toBe(110);
  });

  it('...', () => {
    expect(maxKnapsackValue(items, 50)).toBe(700);
  });

  it('...', () => {
    expect(maxKnapsackValue(items, 100)).toBe(1400);
  });
});

describe('...', () => {
  const items = [
    { weight: 5, value: 70 },
    { weight: 3, value: 40 }, // keep
    { weight: 3, value: 10 }, // prune this
    { weight: 6, value: 30 } // prune this
  ];
  it('...', () => {
    expect(maxKnapsackValue(items, 100)).toBe(1400);
  });
});

describe('...', () => {
  const items = [{ weight: 7, value: 160 }, { weight: 3, value: 90 }, { weight: 2, value: 15 }];

  it('...', () => {
    expect(maxKnapsackValue(items, 7)).toBe(180);
  });

  it('...', () => {
    expect(maxKnapsackValue(items, 50)).toBe(1455);
  });

  it('...', () => {
    expect(maxKnapsackValue(items, 100)).toBe(2970);
  });
});

describe('...', () => {
  const items = [{ weight: 0, value: 160 }, { weight: 3, value: 90 }, { weight: 2, value: 15 }];

  it('...', () => {
    expect(maxKnapsackValue(items, 7)).toBe(Infinity);
  });

  it('...', () => {
    expect(maxKnapsackValue(items, 0)).toBe(Infinity);
  });
});

describe('...', () => {
  const items = [
    { weight: 7, value: 160 },
    { weight: 3, value: 90 },
    { weight: 2, value: 15 },
    { weight: 0, value: 0 }
  ];

  it('...', () => {
    expect(maxKnapsackValue(items, 7)).toBe(180);
  });

  it('...', () => {
    expect(maxKnapsackValue(items, 50)).toBe(1455);
  });

  it('...', () => {
    expect(maxKnapsackValue(items, 100)).toBe(2970);
  });
});
