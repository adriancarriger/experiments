import reverseLinkedList from './reverse-linked-list';
import { createLinkedList } from './linked-list';

describe('...', () => {
  it('...', () => {
    const linkedList = createLinkedList([1, 2, 3]);
    expect(linkedList.toArray()).toEqual([1, 2, 3]);
  });

  it('...', () => {
    const linkedList = createLinkedList([1, 2, 3]);
    const reversedLinkedList = reverseLinkedList(linkedList);

    expect(reversedLinkedList.toArray()).toEqual([3, 2, 1]);
  });
});
