import { BinaryTreeNode } from '../binanry-tree'
import { isSuperbalanced } from './super-balanced';

describe('...', () => {
  it('...', () => {
    const { tree, leftBrach } = getBaseTree();
    leftBrach
      .insertRight(5)
      .insertLeft(7);
    expect(isSuperbalanced(tree)).toBe(true);
  });

  it('...', () => {
    const { tree, leftBrach } = getBaseTree();
    leftBrach
      .insertRight(5)
      .insertLeft(7)
      .insertRight(8);
    expect(isSuperbalanced(tree)).toBe(false);
  });

  function getBaseTree() {
    const tree = new BinaryTreeNode(1);
    tree
      .insertRight(3)
      .insertRight(6);
    const leftBrach = tree.insertLeft(2);
    leftBrach.insertLeft(4);
    return {
      tree,
      leftBrach
    }
  }
});
