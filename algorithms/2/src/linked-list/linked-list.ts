export class ListNode {
  public next: ListNode;

  constructor(public value: any) {}

  public toArray() {
    const result = [this.value];
    let currentNode = this.next;

    while (currentNode) {
      result.push(currentNode.value);
      currentNode = currentNode.next;
    }

    return result;
  }
}

export function createLinkedList(values: any[]) {
  const startNode = new ListNode(values.shift());
  let currentNode = startNode;
  values.forEach(value => {
    currentNode.next = new ListNode(value);
    currentNode = currentNode.next;
  });

  return startNode;
}
