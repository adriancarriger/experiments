import minMaxSum from './mini-max-sum';

describe('...', () => {
  it('...', () => {
    const { min, max } = minMaxSum([1, 2, 3, 4, 5]);
    expect(min).toEqual('10');
    expect(max).toEqual('14');
  });

  it('...', () => {
    const { min, max } = minMaxSum([7, 69, 2, 221, 8974]);
    expect(min).toEqual('299');
    expect(max).toEqual('9271');
  });
});
