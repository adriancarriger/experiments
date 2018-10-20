export function allRandoms(callback, x, y) {
  const results = {};
  for (let a = 1; a <= x; a++) {
    for (let b = 1; b <= x; b++) {
      const randX = (() => {
        const randomNumbers = [a, b];
        return () => randomNumbers.shift();
      })();
      const number = callback(randX, x, y);
      results[number] = (results[number] || 0) + 1;
    }
  }

  // console.log(JSON.stringify(results, undefined, 2));

  return results;
}

export function isRandom(resultObject) {
  const array = Object.keys(resultObject).filter(key => key !== 'Roll again!');
  return (
    array.length &&
    array.map(key => resultObject[key]).every((item, index, array) => item === array[0])
  );
}
