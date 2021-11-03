/**
 * Your HitCounter object will be instantiated and called as such:
 * var obj = new HitCounter()
 * obj.hit(timestamp)
 * var param_2 = obj.getHits(timestamp)
 */

class HitCounter {
  #hits = [];

  /**
   * @param {number} timestamp
   * @return {void}
   */
  hit(timestamp) {
    this.#hits[timestamp] = 1 + (this.#hits[timestamp] || 0);
  }

  /**
   * @param {number} timestamp
   * @return {number}
   */
  getHits(timestamp) {
    return this.#hits
      .slice(Math.max(timestamp - 299, 0), timestamp + 1)
      .reduce((sum, item) => sum + item, 0);
  }
}
