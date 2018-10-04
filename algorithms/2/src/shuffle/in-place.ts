export function shuffle(input: any[]) {
  const ceiling = input.length - 1;
  for (let i = 0; i < input.length; i++) {
    const switchIndex = getRandom(i, ceiling);
    [input[i], input[switchIndex]] = [input[switchIndex], input[i]];
  }
}

function getRandom(floor, ceiling) {
  return Math.floor(Math.random() * (ceiling - floor + 1)) + floor;
}
