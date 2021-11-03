/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number[][]}
 */
const pathSum = (root, targetSum) => {
  const results = [];
  const current = [];

  const explore = (sum = 0, node = root) => {
    if (node === null) {
      return;
    }

    const nextSum = sum + node.val;

    if (nextSum === targetSum) {
      const isLeaf = node.left === null && node.right === null;

      if (isLeaf) {
        return results.push([...current, node.val]);
      }
    }

    current.push(node.val);

    explore(nextSum, node.left);
    explore(nextSum, node.right);

    current.pop();
  };

  explore();

  return results;
};
