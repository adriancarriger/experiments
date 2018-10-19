export function combinations(amount, coins) {
  coins.sort();
  const ways = [1];

  coins.forEach(coin => {
    for (let i = coin; i <= amount; i++) {
      ways[i] = ways[i - coin] + (ways[i] || 0);
    }
  });

  return ways[amount];
}
