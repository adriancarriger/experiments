function rotateLeft(d, arr) {
  for (let i = 0; i < d; i++) {
    const removed = arr.shift();

    arr.push(removed);
  }

  return arr;
}
