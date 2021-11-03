/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const detectCycle = (head) => {
  let runner = head;
  let walker = head;

  while (runner?.next?.next) {
    runner = runner.next.next;
    walker = walker.next;

    if (runner === walker) {
      let walker2 = head;

      while (true) {
        if (walker === walker2) {
          return walker;
        }

        walker = walker.next;
        walker2 = walker2.next;
      }
    }
  }

  return null;
};

/**
 * But why tho?
 *
 * ## Variables
 * - x => distance to start of loop
 * - y => distance from x to meeting point
 * - z => distanace from y to x
 * - k => number of times the fast runner goes around the loop
 * - L => y + z (length of the cycle)
 *
 * ## Base Facts
 *
 * ### Slow runner distance
 * x + y
 * ### Fast runner distance
 * x + k(y + z) + y
 *
 * ### Equations
 * - 2(x + y) = x + y + k(L)
 * - x + y = k(L)
 * - x = k(L) - y
 * - x % L = (k(L) - y) % L
 * - x % L = L - y
 *   - We only care about the remainder which is L - y
 * - x % L = (y + z) - y
 *   - L is the same as y + z
 * - x % L = z
 */
