/**
 * @param {TreeNode} root
 * @param {number} L
 * @param {number} R
 * @return {number}
 */
export default (root, min, max) => {
  return sumNodes(root, min, max);
};

function sumNodes(root, min, max) {
  let sum = 0;

  if (root.val >= min && root.val <= max) {
    sum += root.val;
  }

  if (root.left && !(root.val < min)) {
    sum += sumNodes(root.left, min, max);
  }

  if (root.right && !(root.val > max)) {
    sum += sumNodes(root.right, min, max);
  }

  return sum;
}

export function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}
