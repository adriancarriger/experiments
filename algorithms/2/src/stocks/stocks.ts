export default (prices: number[]) => {
  let lowest = prices[0];
  let maxProfit = -Infinity;

  for (let i = 1; i < prices.length; i++) {
    const newProfit = prices[i] - lowest;
    maxProfit = Math.max(newProfit, maxProfit);
    lowest = Math.min(lowest, prices[i]);
  }

  return maxProfit;
};
