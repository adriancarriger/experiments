import aStar from './a-star';
import { networkExample } from './network';

describe('…', () => {
  it('…', () => {
    expect(aStar(networkExample, 0, 4)).toEqual([0, 36, 4]);
  });

  it('…', () => {
    expect(aStar(networkExample, 0, 36)).toEqual([0, 36]);
  });

  it('…', () => {
    expect(aStar(networkExample, 2, 35)).toEqual([2, 36, 28, 17, 1, 35]);
  });

  it('…', () => {
    expect(aStar(networkExample, 5, 34)).toEqual([5, 16, 37, 12, 34]);
  });
});
