export function containsTwoValidLengths(totalLength, itemLengths) {
  const lengthsIndex = {};

  for (let i = 0; i < itemLengths.length; i++) {
    if (lengthsIndex[itemLengths[i]] !== undefined) {
      return true;
    }

    lengthsIndex[totalLength - itemLengths[i]] = i;
  }

  return false;
}
