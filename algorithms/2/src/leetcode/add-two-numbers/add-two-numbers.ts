import { ListNode } from './list-node';
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
export default (l1, l2) => {
  let result = new ListNode(0);
  let current = result;
  let remainder = 0;

  while (l1 || l2) {
    l1 = l1 || new ListNode(0);
    l2 = l2 || new ListNode(0);

    const sum = l1.val + l2.val + remainder;
    remainder = Math.floor(sum / 10);
    current.val = sum % 10;

    if (l1.next || l2.next) {
      current.next = new ListNode(0);
    }

    l1 = l1.next;
    l2 = l2.next;

    if (current.next) {
      current = current.next;
    }
  }

  if (remainder > 0) {
    current.next = new ListNode(remainder);
  }

  return result;
};
