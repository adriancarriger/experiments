/**
 * @param {number[]} height
 * @return {number}
 */
const maxArea = function (heights) {
  let leftPointer = 0;
  let rightPointer = heights.length - 1;
  let max = 0;

  while (true) {
    const height = Math.max(heights[leftPointer], heights[leftPointer]);
    const width = rightPointer - leftPointer;
    const area = width * height;
  }
};
