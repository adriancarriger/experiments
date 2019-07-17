import rangeSumBST, { TreeNode } from './range-sum-of-bst';

describe('...', () => {
  it('...', () => {
    const root = createNode(
      10,
      createNode(5, createNode(3), createNode(7)),
      createNode(15, null, createNode(18))
    );
    expect(rangeSumBST(root, 7, 15)).toBe(32);
  });
});

function createNode(value, left = null, right = null) {
  const node = new TreeNode(value);
  node.left = left;
  node.right = right;

  return node;
}
