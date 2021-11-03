const eraseOverlapIntervals = (intervals) => {
  intervals.sort((a, b) => a[1] - b[1]);

  let pointer = null;
  let remove = 0;

  intervals.forEach(([start, end]) => {
    if (pointer !== null && start < pointer) {
      remove++;
    } else {
      pointer = end;
    }
  });

  return remove;
};
