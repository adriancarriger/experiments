/**
 * @param {number[][]} intervals
 * @return {number}
 */
const minMeetingRooms = (intervals) => {
  const items = [];
  const add = (index, amount) => (items[index] = (items[index] || 0) + amount);
  let max = 0;
  let current = 0;

  intervals.forEach(([startTime, endTime]) => {
    add(startTime, 1);
    add(endTime, -1);
  });

  items.forEach((item) => {
    current += item;
    max = Math.max(current, max);
  });

  return max;
};
