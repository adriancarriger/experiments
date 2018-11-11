export default (array: number[], k: number): number => {
  const counts = array.reduce((hash, item) => {
    hash[item] = 1 + (hash[item] || 0);

    return hash;
  }, {});
  const keys = Object.keys(counts);
  keys.sort((a, b) => counts[b] - counts[a]);

  return Number(keys[k - 1]);
};
