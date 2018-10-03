import { getHighestProduct } from './product';

describe('...', () => {
  it('...', () => {
    expect(getHighestProduct([8, 1, 3, 6])).toEqual(144);
  });

  it('...', () => {
    expect(getHighestProduct([0, 0, 0, 1, 5])).toEqual(0);
  });

  it('...', () => {
    expect(getHighestProduct([10, 10, 0, 1, 0])).toEqual(100);
  });

  it('...', () => {
    expect(getHighestProduct([10, 44, 20, 1, 900])).toEqual(792000);
  });

  it('...', () => {
    expect(getHighestProduct([-3, -10, -10, 1, 3, 2])).toEqual(300);
  });

  it('...', () => {
    expect(getHighestProduct([-1, -100000, 155, 300, 9999])).toEqual(999900000);
  });

  it('...', () => {
    expect(getHighestProduct([1, 2, 0, 2, -5, 2, 2], 4)).toEqual(16);
  });

  it('...', () => {
    expect(getHighestProduct([-100, 2, -2, 2, -5, 2, 2, -1], 4)).toEqual(-100 * -5 * 2 * 2);
  });

  it('...', () => {
    expect(getHighestProduct([-100, 2, -2, 2, -5, 2, 2, -1, 100], 4)).toEqual(-100 * -5 * 100 * 2);
  });

  it('...', () => {
    const expected = -100 * -5 * 100 * 2 * 2;
    expect(getHighestProduct([-100, 2, -2, 2, -5, 2, 2, -1, 100], 5)).toEqual(expected);
  });
});
