import getMaxProfit from './stocks';

describe('...', () => {
  it('...', () => {
    const prices = [10, 7, 5, 8, 11, 9];
    expect(getMaxProfit(prices)).toBe(6);
  });

  it('...', () => {
    const prices = [1, 5, 3, 2];
    expect(getMaxProfit(prices)).toBe(4);
  });

  it('...', () => {
    const prices = [7, 2, 8, 9];
    expect(getMaxProfit(prices)).toBe(7);
  });

  it('...', () => {
    const prices = [1, 6, 7, 9];
    expect(getMaxProfit(prices)).toBe(8);
  });

  it('...', () => {
    const prices = [9, 7, 4, 1];
    expect(getMaxProfit(prices)).toBe(-2);
  });

  it('...', () => {
    const prices = [1, 1, 1, 1];
    expect(getMaxProfit(prices)).toBe(0);
  });
});
