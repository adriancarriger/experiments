/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
const findLength = (A, B) => {
  let answer = 0;
  const cache = [];

  for (let i = 0; i < A.length; i++) {
    for (let j = 0; j < B.length; j++) {
      if (A[i] === B[j]) {
        cache[i] ||= [];
        cache[i][j] = (cache[i - 1]?.[j - 1] || 0) + 1;

        answer = Math.max(answer, cache[i][j]);
      }
    }
  }

  return answer;
};
