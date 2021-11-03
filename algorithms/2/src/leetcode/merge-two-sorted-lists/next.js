/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const mergeTwoLists = (list1, list2) => {
  let newList;
  let head;

  const push = (item) => {
    if (newList) {
      head.next = item;
    } else {
      newList = item;
    }
    head = item;
  };

  while (list1 || list2) {
    if ((list1?.val ?? Infinity) < (list2?.val ?? Infinity)) {
      const next = list1.next;
      push(list1);
      list1 = next;
    } else {
      const next = list2.next;
      push(list2);
      list2 = next;
    }
  }

  return newList || list1;
};
