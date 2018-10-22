import { Stack } from './stack';

export class Queue {
  private inStack = new Stack();
  private outStack = new Stack();

  public enqueue(item) {
    this.inStack.push(item);
  }

  public dequeue() {
    if (this.outStack.peek() === null) {
      while (this.inStack.peek() !== null) {
        this.outStack.push(this.inStack.pop());
      }

      if (this.outStack.peek() === null) {
        throw new Error("Can't dequeue from empty queue!");
      }
    }

    return this.outStack.pop();
  }
}
