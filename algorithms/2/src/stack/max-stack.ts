import { Stack } from './stack';

export class MaxStack extends Stack {
  private maxStack = new Stack();

  public getMax() {
    return this.maxStack.peek();
  }

  public push(item) {
    if (!this.maxStack.peek() || item > this.maxStack.peek()) {
      this.maxStack.push(item);
    }
    super.push(item);
  }

  public pop() {
    const item = super.pop();
    if (item === this.maxStack.peek()) {
      this.maxStack.pop();
    }
    return item;
  }
}
