export class Queue {
  public size = 0;
  private items = [];

  public enqueue(node: string) {
    this.size++;
    this.items.push(node);
  }
  public dequeue(): string {
    this.size--;
    return this.items.shift();
  }
}
