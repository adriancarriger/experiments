import { ListNode } from './common';

export default (list1: ListNode, list2: ListNode) => {
  let list: ListNode;
  const current = { list1, list2, node: undefined };

  const smallestList = () => {
    if (!current.list1) {
      return 2;
    }

    if (!current.list2) {
      return 1;
    }

    return current.list1.val < current.list2.val ? 1 : 2;
  };

  while (current.list1 || current.list2) {
    const listNumber = smallestList();

    if (!list) {
      list = current[`list${listNumber}`];
      current.node = list;
    } else {
      current.node.next = current[`list${listNumber}`];
      current.node = current.node.next;
    }

    // Advance node
    current[`list${listNumber}`] = current[`list${listNumber}`].next;
  }

  if (!list) {
    return list1;
  }

  return list;
};
