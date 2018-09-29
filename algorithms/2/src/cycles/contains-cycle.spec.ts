import { containsCycle } from './contains-cycle';

class LinkedListNode {
  public value;
  public next;

  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

describe('Cycle detection', () => {
  let nodes;

  it('checks a linked list with no cycle', () => {
    valuesToLinkedListNodes([1, 2, 3, 4]);
    expect(containsCycle(nodes[0])).toBe(false);
  });

  it('finds a cycle that loops to beginning', () => {
    valuesToLinkedListNodes([1, 2, 3, 4]);
    nodes[3].next = nodes[0];
    expect(containsCycle(nodes[0])).toBe(true);
  });

  it('finds a cycle that loops to the middle', () => {
    valuesToLinkedListNodes([1, 2, 3, 4, 5]);
    nodes[4].next = nodes[2];
    expect(containsCycle(nodes[0])).toBe(true);
  });

  it('finds a cycle in a two node cycle at end', () => {
    valuesToLinkedListNodes([1, 2, 3, 4, 5]);
    nodes[4].next = nodes[3];
    expect(containsCycle(nodes[0])).toBe(true);
  });

  it('finds no cycle in an empty list', () => {
    expect(containsCycle(null)).toBe(false);
  });

  it('finds no cycle in a one element linked list', () => {
    const firstNode = new LinkedListNode(1);
    expect(containsCycle(firstNode)).toBe(false);
  });

  it('finds a cycle in a single element linked list cycle', () => {
    const firstNode = new LinkedListNode(1);
    firstNode.next = firstNode;
    expect(containsCycle(firstNode)).toBe(true);
  });

  function valuesToLinkedListNodes(values) {
    nodes = [];
    for (let i = 0; i < values.length; i++) {
      const node = new LinkedListNode(values[i]);
      if (i > 0) {
        nodes[i - 1].next = node;
      }
      nodes.push(node);
    }
  }
});
