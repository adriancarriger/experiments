export function egg(totalFloors) {
  return Math.round(quadratic(1, 1, -2 * totalFloors));
}

export function eggBruteForce(totalFloors) {
  const possibilities = {};
  for (let i = 1; i <= totalFloors; i++) {
    possibilities[i] = worstCase(i, totalFloors);
  }

  const max = { drops: totalFloors, dropPoint: 1 };
  Object.keys(possibilities).forEach(dropPoint => {
    if (possibilities[dropPoint] <= max.drops) {
      max.dropPoint = Number(dropPoint);
      max.drops = possibilities[dropPoint];
    }
  });

  return max;
}

function worstCase(increase, totalFloors) {
  const lowest = breaksRightAway(increase).length;
  const highest = breaksOnHighestFloor(increase, totalFloors).length;

  return Math.max(lowest, highest);
}

function breaksRightAway(increase) {
  const steps = [increase];
  for (let i = 1; i < increase; i++) {
    steps.push(i);
  }

  return steps;
}

function breaksOnHighestFloor(increase, totalFloors) {
  const steps = [];
  let increaseAmount = increase;
  let floor = increase;
  while (floor <= totalFloors) {
    steps.push(floor);
    if (increaseAmount - 1 > 0) {
      increaseAmount = increaseAmount - 1;
    }
    floor = floor + increaseAmount;
  }
  const breakingPoint = steps[steps.length - 1];
  const lastNonBreakingPoint = steps[steps.length - 2];

  // Egg is broken now :/
  for (let i = lastNonBreakingPoint + 1; i < breakingPoint; i++) {
    steps.push(i);
  }

  return steps;
}

function quadratic(a, b, c) {
  const quad = mod => (-b + mod * Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a);
  return Math.max(quad(1), quad(-1));
}
