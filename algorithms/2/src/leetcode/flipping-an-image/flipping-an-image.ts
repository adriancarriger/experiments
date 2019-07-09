/**
 * @param {number[][]} input
 * @return {number[][]}
 */
export default input => input.map(row => row.reverse().map(number => 1 ^ number));
