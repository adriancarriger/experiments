import mergeTwoLists from './merge-two-sorted-lists';
import { ListNode } from './common';

describe('...', () => {
  it('...', () => {
    const list1 = createList([1, 2]);
    const list2 = createList([3, 4]);

    expect(mergeTwoLists(list1, list2)).toEqual(createList([1, 2, 3, 4]));
  });

  it('...', () => {
    const list1 = createList([1, 2, 4]);
    const list2 = createList([1, 3, 4]);

    expect(mergeTwoLists(list1, list2)).toEqual(createList([1, 1, 2, 3, 4, 4]));
  });
});

function createList(inputs: number[]) {
  let list;
  let currentNode;
  inputs.forEach(input => {
    if (list) {
      currentNode.next = new ListNode(input);
      currentNode = currentNode.next;
    } else {
      list = new ListNode(input);
      currentNode = list;
    }
  });

  return list;
}
