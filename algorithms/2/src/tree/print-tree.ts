import { BinaryTreeNode } from './binanry-tree';

export function printTree(tree: BinaryTreeNode, maxDepth = 4) {
  let nodes = [tree];
  let depth = 0;

  while (nodes.length) {
    const theseNodes = [...nodes];
    nodes = [];
    const spaces = Math.round((Math.pow(2, maxDepth) * 6) / (theseNodes.length + 1));
    const spacer = [...Array(spaces).keys()].map(() => ' ').join('');

    const treeInStringFormat = theseNodes.reduce((previous, node) => {
      if (node) {
        if (node.left) {
          nodes.push(node.left);
        }
        if (node.right) {
          nodes.push(node.right);
        }
        previous = previous + node.value + spacer;
      }
      return previous;
    }, spacer);
    console.log(`\nDepth: ${depth}    ${treeInStringFormat}`);
    depth++;
  }
}
