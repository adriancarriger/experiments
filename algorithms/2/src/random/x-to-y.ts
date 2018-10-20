export function xToY(randX, x, y) {
  if (x > y) {
    return decreaseRandom(randX, x, y);
  }

  if (x < y) {
    return increaseRandom(randX, x, y);
  }

  return randX();
}

function increaseRandom(randX, x, y) {
  const cells = x * x;
  if (cells < y) {
    throw 'Not designed to make more than 2 calls to `randX`';
  }
  while (true) {
    const cell = (randX() - 1) * x + (randX() - 1) + 1;

    if (cell > cells - (cells % y)) {
      // Normally this would be `continue;`
      return 'Roll again!';
    }

    return cell % y;
  }
}

function decreaseRandom(randX, x, y) {
  while (true) {
    const roll = randX();
    if (roll > y) {
      return 'Roll again!';
    }

    return roll;
  }
}
