export function reverse(array, start?, end?) {
  // Set defaults
  if (!start) {
    start = 0;
  }
  if (!end) {
    end = array.length;
  }

  reverse1(array, start, end);
  // reverse2(array, start, end);
}

function reverse1(array, start, end) {
  while (start < end) {
    swap(array, start, end);
    start++;
    end--;
  }
}

function reverse2(array, start, end) {
  for (let i = 0; i <= (end - start) / 2; i++) {
    const lower = i + start;
    const higher = end - lower + start;
    swap(array, higher, lower);
  }
}

function swap(array, a, b) {
  [array[a], array[b]] = [array[b], array[a]];
}
