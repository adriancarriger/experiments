import { BinaryTreeNode } from '../binanry-tree';

export function secondLargest(root: BinaryTreeNode) {
  const { lastNode, largest } = findLargest(root);

  if (!largest.left) {
    return lastNode.value;
  }

  return findLargest(largest.left).largest.value;
}

function findLargest(node) {
  let lastNode = node;
  let largest = node;

  while (largest.right) {
    lastNode = largest;
    largest = largest.right;
  }

  return { lastNode, largest }
}
