import { ListNode } from './linked-list';

export default (linkedList: ListNode): ListNode => {
  let lastNode = linkedList;
  let currentNode = linkedList.next;
  lastNode.next = undefined;

  while (true) {
    let nextNode = currentNode.next; // save it

    currentNode.next = lastNode;

    if (!nextNode) {
      break;
    }

    // Prepare for next
    lastNode = currentNode;
    currentNode = nextNode;
  }

  return currentNode;
};
