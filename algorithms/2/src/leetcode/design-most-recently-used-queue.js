/**
 * @param {number} n
 */
const MRUQueue = function (n) {
  this.items = Array(n)
    .fill(0)
    .map((_, index) => index + 1);
};

/**
 * @param {number} k
 * @return {number}
 */
MRUQueue.prototype.fetch = function (k) {
  const index = k - 1;
  this.items = [...this.items.slice(0, index), ...this.items.slice(index + 1), this.items[index]];

  return this.items.slice(-1)[0];
};

/**
 * Your MRUQueue object will be instantiated and called as such:
 * var obj = new MRUQueue(n)
 * var param_1 = obj.fetch(k)
 */
