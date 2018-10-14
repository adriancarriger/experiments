import { BinaryTreeNode } from './binanry-tree';

export function balancedTree(max = 30) {
  const items = [...Array(max + 1).keys()].slice(1);
  const mid = midPoint(items.length);
  const tree = new BinaryTreeNode(items[mid]);
  addLeafs(tree, 'insertLeft', items.slice(0, mid));
  addLeafs(tree, 'insertRight', items.slice(mid));

  return tree;
}

function addLeafs(node, method, items) {
  if (items.length === 1) {
    if (items[0] === 1) {
      node[method](items[0]);
    }
    return;
  }
  const mid = midPoint(items.length);
  const newNode = node[method](items[mid]);
  addLeafs(newNode, 'insertLeft', items.slice(0, mid));
  addLeafs(newNode, 'insertRight', items.slice(mid));
}

function midPoint(input) {
  return Math.round(input / 2);
}
