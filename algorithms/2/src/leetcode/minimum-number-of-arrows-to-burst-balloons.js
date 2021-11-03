/**
 * @param {number[][]} points
 * @return {number}
 */
const findMinArrowShots = (points) => {
  points.sort((a, b) => a[1] - b[1]);

  let pointer = null;
  let count = 0;

  points.forEach(([start, end]) => {
    if (pointer === null) {
      pointer = end;
      count++;
    } else if (start > pointer) {
      count++;
      pointer = end;
    } else {
      pointer = Math.min(pointer, end);
    }
  });

  return count;
};
