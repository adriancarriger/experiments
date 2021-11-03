class WordDistance {
  #wordHash;

  /**
   * @param {string[]} wordsDict
   */
  constructor(wordDictionary) {
    this.#wordHash = {};
    wordDictionary.forEach((word, index) => {
      this.#wordHash[word] ||= [];
      this.#wordHash[word].push(index);
    });
  }

  /**
   * @param {string} word1
   * @param {string} word2
   * @return {number}
   */
  shortest(word1, word2) {
    const word1Indexes = this.#wordHash[word1];
    const word2Indexes = this.#wordHash[word2];

    let min;
    let word1Index = 0;
    let word2Index = 0;

    while (word1Index < word1Indexes.length && word2Index < word2Indexes.length) {
      const next = Math.abs(word1Indexes[word2Index] - word2Indexes[word1Index]);

      if (min === undefined || next < min) {
        min = next;
      }

      if (word1Index < word2Index) {
        word1Index++;
      } else {
        word2Index++;
      }
    }

    return min;
  }
}

/**
 * Your WordDistance object will be instantiated and called as such:
 * var obj = new WordDistance(wordsDict)
 * var param_1 = obj.shortest(word1,word2)
 */
