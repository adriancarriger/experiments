/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {TreeNode}
 */
const mergeTrees = (root1, root2) => {
  if (root1 === null && root2 === null) {
    return null;
  }

  const value = root1?.val || 0 + root2?.val || 0;

  return new TreeNode(
    value,
    mergeTrees(root1?.left, root2?.left),
    mergeTrees(root1?.right, root2?.right)
  );
};
