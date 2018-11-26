export default paths => {
  const linkedList = paths.reduce((previous, current, index) => {
    previous[current[1]] = previous[current[1]] || {};
    previous[current[1]].previous = paths[index][0];
    previous[current[0]] = previous[current[0]] || {};
    previous[current[0]].next = paths[index][1];

    return previous;
  }, {});

  // Add an initial path to the result
  const result = [paths[0][0]];

  // Add items before initial path
  while (true) {
    const firstItem = linkedList[result[0]];
    if (firstItem.previous === undefined) {
      break;
    }
    result.unshift(firstItem.previous);
  }

  // Add items after initial path
  while (true) {
    const lastItem = linkedList[result[result.length - 1]];
    if (lastItem.next === undefined) {
      break;
    }
    result.push(lastItem.next);
  }

  return result;
};
