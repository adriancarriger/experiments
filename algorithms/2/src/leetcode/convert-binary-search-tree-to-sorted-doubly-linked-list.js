/**
 * // Definition for a Node.
 * function Node(val, left, right) {
 *      this.val = val;
 *      this.left = left;
 *      this.right = right;
 *  };
 */

/**
 * @param {Node} root
 * @return {Node}
 */
const treeToDoublyList = (root) => {
  let max;
  let min;

  const getLinkedList = ({ node, reference, direction }) => {
    if (!node) {
      return node;
    }

    if (!max || node.val > max.val) {
      max = node;
    }

    if (!min || node.val < min.val) {
      min = node;
    }

    node.left = getLinkedList({ node: node.left, reference: node, direction: 'right' });
    node.right = getLinkedList({ node: node.right, reference: node, direction: 'left' });

    if (reference) {
      let end = node;

      while (end[direction]) {
        end = end[direction];
      }

      end[direction] = reference;

      return end;
    }

    return node;
  };

  getLinkedList({ node: root });

  if (!min) {
    return null;
  }

  max.right = min;
  min.left = max;

  return min;
};
