const checkInclusion = (s1, s2) => {
  if (s1.length > s2.length) {
    return false;
  }

  const countMap = new Map();
  const stringMap = new Map();

  let left = 0;
  let right = s1.length - 1;

  // Populate map
  for (let i = 0; i <= right; i++) {
    incrementMap(countMap, s1[i]);
    incrementMap(stringMap, s2[i]);
  }

  while (right < s2.length) {
    if (mapsAreEqual(countMap, stringMap)) {
      return true;
    }

    incrementMap(stringMap, s2[left], -1);

    ++left;
    ++right;

    incrementMap(stringMap, s2[right]);
  }

  return false;
};

function mapsAreEqual(map1, map2) {
  if (map1.size !== map2.size) {
    return false;
  }

  for (let key of map1.keys()) {
    if (map1.get(key) !== map2.get(key)) {
      return false;
    }
  }

  return true;
}

function incrementMap(inputMap, key, amount = 1) {
  const count = inputMap.get(key) || 0;
  const next = count + amount;

  if (next === 0) {
    return inputMap.delete(key);
  }

  inputMap.set(key, next);
}
