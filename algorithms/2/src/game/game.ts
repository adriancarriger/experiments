export function sortScores(unsorted, highest) {
  const scoreCounts = [...Array(highest + 1).keys()].reduce((previous, current) => {
    previous[current] = 0;
    return previous;
  }, {});

  unsorted.forEach(score => {
    scoreCounts[score]++;
  });

  return Object.keys(scoreCounts)
    .reverse()
    .reduce((previous, current) => {
      for (let i = 0; i < scoreCounts[current]; i++) {
        previous.push(Number(current));
      }
      return previous;
    }, []);
}
