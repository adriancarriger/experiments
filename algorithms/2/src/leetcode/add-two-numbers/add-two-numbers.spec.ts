import addTwoNumbers from './add-two-numbers';
import { ListNode } from './list-node';

describe('...', () => {
  it('...', () => {
    const l1 = LinkedList([2, 4, 3]);
    const l2 = LinkedList([5, 6, 4]);

    const result = LinkedList([7, 0, 8]);
    expect(addTwoNumbers(l1, l2)).toEqual(result);
  });

  it('...', () => {
    const l1 = LinkedList([9, 4, 3]);
    const l2 = LinkedList([1]);

    const result = LinkedList([0, 5, 3]);
    expect(addTwoNumbers(l1, l2)).toEqual(result);
  });

  it('...', () => {
    const l1 = LinkedList([5]);
    const l2 = LinkedList([5]);

    const result = LinkedList([0, 1]);
    expect(addTwoNumbers(l1, l2)).toEqual(result);
  });
});

function LinkedList(inputs: number[]) {
  let list = new ListNode(inputs[0]);
  let node = list;

  inputs.slice(1).forEach(input => {
    node.next = new ListNode(input);
    node = node.next;
  });

  return list;
}
