/**
 * @param {number} capacity
 */
const LRUCache = function (capacity) {
  this.capacity = capacity;
  this.hash = {};
  this.head = null;
  this.tail = null;
  this.count = 0;
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  if (this.hash[key]) {
    const { value, previous, next } = this.hash[key];

    if (previous) {
      previous.next = next;
    }

    if (next) {
      next.previous = previous || next.previous;
    }

    if (this.tail.key === key) {
      this.tail = previous || this.hash[key];
    }

    this.hash[key].previous = null;

    if (this.head !== this.hash[key]) {
      this.hash[key].next = this.head;
      this.head.previous = this.hash[key];
    }

    this.head = this.hash[key];

    return value;
  }

  return -1;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  if (this.hash[key]) {
    this.hash[key].value = value;
    this.get(key);
  } else {
    this.hash[key] = { key, value, next: null, previous: null };

    if (this.head) {
      this.hash[key].next = this.head;
      this.head.previous = this.hash[key];
    }

    this.head = this.hash[key];

    if (!this.tail) {
      this.tail = this.hash[key];
    }

    this.count += 1;
  }

  if (this.count > this.capacity) {
    const deleteKey = this.tail.key;

    if (this.tail.previous) {
      this.tail.previous.next = null;
      this.tail = this.tail.previous;
    }

    delete this.hash[deleteKey];
    this.count -= 1;
  }
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
