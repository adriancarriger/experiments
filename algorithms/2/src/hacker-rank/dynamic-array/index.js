function dynamicArray(n, queries) {
  const arr = Array(n)
    .fill(0)
    .map(() => []);
  let lastAnswer = 0;
  const answers = [];

  queries.forEach(([queryType, x, y]) => {
    const idx = (x ^ lastAnswer) % n;

    if (queryType === 1) {
      return arr[idx].push(y);
    }

    lastAnswer = arr[idx][y % arr[idx].length];
    answers.push(lastAnswer);
  });

  return answers;
}
