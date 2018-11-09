export default (amount, coins) => {
  coins.sort((a, b) => a - b);
  const ways = [1];

  coins.forEach(coin => {
    for (let i = coin; i <= amount; i++) {
      ways[i] = ways[i - coin] + (ways[i] || 0);
    }
  });

  return ways[amount];
};
