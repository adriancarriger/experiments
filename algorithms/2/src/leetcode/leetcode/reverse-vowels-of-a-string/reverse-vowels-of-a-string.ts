/**
 * @param {string} s
 * @return {string}
 */
export default s => {
  let result = s.split('');
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  const rotations = [];

  for (let i = 0; i < result.length; i++) {
    if (vowels.includes(result[i].toLowerCase())) {
      rotations.push(i);
    }
  }

  const iterations = Math.floor(rotations.length / 2);

  for (let i = 0; i < iterations; i++) {
    const endIndex = rotations.length - i - 1;
    const start = rotations[i];
    const end = rotations[endIndex];

    [result[start], result[end]] = [result[end], result[start]];
  }

  return result.join('');
};
