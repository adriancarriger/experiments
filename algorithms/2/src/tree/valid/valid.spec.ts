import { BinaryTreeNode } from '../binanry-tree';
import { validTree } from './valid';
import { balancedTree } from '../balanced-tree';
import { printTree } from '../print-tree';

describe('...', () => {
  it('...', () => {
    const tree = balancedTree();
    expect(validTree(tree)).toBe(true);
  });

  it('...', () => {
    const tree = new BinaryTreeNode(5);
    tree.insertRight(10);
    expect(validTree(tree)).toBe(true);
  });

  it('...', () => {
    const tree = new BinaryTreeNode(5);
    tree.insertRight(2);
    expect(validTree(tree)).toBe(false);
  });

  it('...', () => {
    const tree = new BinaryTreeNode(9999);
    expect(validTree(tree)).toBe(true);
  });

  it('...', () => {
    const tree = new BinaryTreeNode(50);
    const right = tree.insertRight(80);
    right.insertRight(90);
    right.insertLeft(70);
    const left = tree.insertLeft(30);
    left.insertLeft(20);
    left.insertRight(60);
    expect(validTree(tree)).toBe(false);
  });

  it('...', () => {
    const tree = new BinaryTreeNode(50);
    const right = tree.insertRight(80);
    right.insertRight(90);
    right.insertLeft(70);
    const left = tree.insertLeft(30);
    left.insertLeft(20);
    left.insertRight(40);
    expect(validTree(tree)).toBe(true);
  });
});
