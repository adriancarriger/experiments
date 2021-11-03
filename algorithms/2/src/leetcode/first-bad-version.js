/**
 * @param {function} isBadVersion()
 * @return {function}
 */
const solution = (isBadVersion) => {
  /**
   * @param {integer} n Total versions
   * @return {integer} The first bad version
   */
  return (n) => {
    let minBadVersion = n;
    let maxGoodVersion = 0;

    while (minBadVersion - maxGoodVersion > 1) {
      const testVersion = maxGoodVersion + Math.floor((minBadVersion - maxGoodVersion) / 2);

      if (isBadVersion(testVersion)) {
        minBadVersion = testVersion;
      } else {
        maxGoodVersion = testVersion;
      }
    }

    return minBadVersion;
  };
};
