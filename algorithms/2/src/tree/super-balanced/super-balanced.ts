import { BinaryTreeNode } from '../binanry-tree';

export function isSuperbalanced(tree: BinaryTreeNode) {
  const terminalNodeDepths = [];
  const nodes = [];

  nodes.push({ treeNode: tree, depth: 0 });

  while (nodes.length) {
    const { treeNode, depth } = nodes.pop();

    if (!treeNode.left && !treeNode.right) {
      if (!terminalNodeDepths.includes(depth)) {
        terminalNodeDepths.push(depth);

        const highestDepth = terminalNodeDepths[terminalNodeDepths.length - 1];
        const depthsDifference = highestDepth - terminalNodeDepths[0];

        if (depthsDifference > 1) {
          return false;
        }
      }
    } else {
      if (treeNode.left) {
        nodes.push({ treeNode: treeNode.left, depth: depth + 1 });
      }
      if (treeNode.right) {
        nodes.push({ treeNode: treeNode.right, depth: depth + 1 });
      }
    }
  }

  return true;
}
