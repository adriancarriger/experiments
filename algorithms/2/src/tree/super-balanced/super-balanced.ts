import { BinaryTreeNode } from '../binanry-tree';

export function isSuperbalanced(tree: BinaryTreeNode) {
  const nodes = [{ depth: 0, node: tree }];
  const leafDepths: number[] = [];

  while (nodes.length) {
    const { depth, node } = nodes.pop();

    if (!node.left && !node.right && !leafDepths.includes(depth)) {
      if (depth - Math.min(...leafDepths) > 1) {
        return false;
      }
      leafDepths.push(depth);
    }

    if (node.left) {
      nodes.push({ depth: depth + 1, node: node.left });
    }

    if (node.right) {
      nodes.push({ depth: depth + 1, node: node.right });
    }
  }

  return true;
}
