export function findRotationPoint(words) {
  let min = 0;
  let max = words.length - 1;

  while (true) {
    const mid = min + Math.round((max - min) / 2);
    if (sequential(words[min], words[mid], words[max])) {
      return words[min] < words[max] ? min : max;
    }
    words[min] < words[mid] ? (min = mid) : (max = mid);
  }
}

function sequential(left, current, right) {
  return (left <= current && current <= right) || (left >= current && current >= right);
}
