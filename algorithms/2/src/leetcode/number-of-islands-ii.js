/**
 * @param {number} m
 * @param {number} n
 * @param {number[][]} positions
 * @return {number[]}
 */
const numIslands2 = (m, n, positions) => {
  const results = [];
  let islands = [];

  positions.forEach((position) => {
    let initialMatchIndex;
    islands = islands.reduce((previous, islandItems, index) => {
      const hasMatch = islandItems.some((islandItem) => {
        const mDiff = Math.abs(islandItem[0] - position[0]);
        const nDiff = Math.abs(islandItem[1] - position[1]);

        return (mDiff === 0 && nDiff === 1) || (mDiff === 1 && nDiff === 0);
      });

      if (hasMatch) {
        if (initialMatchIndex === undefined) {
          initialMatchIndex = index;

          return [...previous, [...islandItems, position]];
        } else {
          // merge
          console.log('merge', { position });
          previous[initialMatchIndex].push(...islandItems);

          return previous;
        }
      } else {
        return [...previous, islandItems];
      }
    }, []);

    if (!initialMatchIndex) {
      islands.push([position]);
    }

    results.push(islands.length);
  });

  return results;
};
