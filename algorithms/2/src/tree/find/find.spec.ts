import { balancedTree } from '../balanced-tree'
import { secondLargest } from './find';

describe('...', () => {
  for (let i = 3; i < 100; i++) {
    it('...', () => {
      const tree = balancedTree(i);
      expect(secondLargest(tree)).toBe(i - 1);
    });
  }
});
