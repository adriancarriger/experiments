const minMeetingRooms = (intervals) => {
  const items = intervals
    .flatMap(([startTime, endTime]) => [
      { change: 1, time: startTime },
      { change: -1, time: endTime },
    ])
    .sort((a, b) => {
      const timeDiff = a.time - b.time;

      if (timeDiff === 0) {
        return a.change - b.change;
      }

      return timeDiff;
    });

  let max = 0;
  let current = 0;

  items.forEach(({ change }) => {
    current += change;
    max = Math.max(max, current);
  });

  return max;
};
