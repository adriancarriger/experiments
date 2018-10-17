import { BinaryTreeNode } from '../binanry-tree';

export function validTree(tree: BinaryTreeNode) {
  const nodes = [{ node: tree, max: Infinity, min: -Infinity }];

  while (nodes.length) {
    const { node, max, min } = nodes.shift();

    if (node.value < min || node.value > max) {
      return false;
    }

    if (node.left) {
      nodes.push({ node: node.left, max: node.value, min });
    }

    if (node.right) {
      nodes.push({ node: node.right, max, min: node.value });
    }
  }

  return true;
}
