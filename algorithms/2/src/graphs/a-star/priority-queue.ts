export class PriorityQueue {
  private items = [];

  get size() {
    return this.items.length;
  }

  enqueue(priority, input) {
    let contain;
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].priority > priority) {
        this.items.splice(i, 0, input);
        contain = true;
        break;
      }
    }

    if (!contain) {
      this.items.push(input);
    }
  }

  dequeue() {
    return this.items.shift();
  }
}
