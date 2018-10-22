export class Stack {
  private items = [];

  public push(item) {
    this.items.push(item);
  }

  public pop() {
    if (!this.items.length) {
      return null;
    }

    return this.items.pop();
  }

  public peek() {
    if (!this.items.length) {
      return null;
    }

    return this.items[this.items.length - 1];
  }
}
