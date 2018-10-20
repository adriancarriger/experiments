export function rand7Fail(rand5) {
  return ((rand5() + rand5()) % 7) + 1;
}

export function rand7(rand5) {
  while (true) {
    const roll1 = rand5();
    const roll2 = rand5();

    const outcomeNumber = (roll1 - 1) * 5 + (roll2 - 1) + 1;

    if (outcomeNumber > 21) {
      // Normally this would be `continue;`
      return 'Roll again!';
    }

    return (outcomeNumber % 7) + 1;
  }
}
