const numerical = (a, b) => a - b;

const minMeetingRooms = (intervals) => {
  const starts = intervals.map(([startTime]) => startTime);
  const ends = intervals.map(([, endTime]) => endTime);

  starts.sort(numerical);
  ends.sort(numerical);

  let count = 0;
  let endIndex = 0;

  for (let startIndex = 0; startIndex < intervals.length; startIndex++) {
    count++;

    // Metting just finished
    if (ends[endIndex] <= starts[startIndex]) {
      count--;
      endIndex++;
    }
  }

  return count;
};
