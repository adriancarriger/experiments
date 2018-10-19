import { combinations } from './coins';

describe('...', () => {
  it('...', () => {
    expect(combinations(4, [3, 2, 1])).toBe(4);
  });

  it('...', () => {
    expect(combinations(4, [1, 2, 3])).toBe(4);
  });

  it('...', () => {
    expect(combinations(4, [1, 2, 3, 4])).toBe(5);
  });

  it('...', () => {
    expect(combinations(20, [1, 2, 3, 4])).toBe(108);
  });

  it('...', () => {
    expect(combinations(20, [1, 2])).toBe(11);
  });

  it('...', () => {
    expect(combinations(100, [1, 5, 10, 25, 50])).toBe(292);
  });

  it('...', () => {
    expect(combinations(200, [1, 5, 10, 25, 50, 100])).toBe(2728);
  });

  it('...', () => {
    expect(combinations(500, [1, 5, 10, 25, 50, 100, 200])).toBe(111022);
  });

  it('...', () => {
    expect(combinations(1000, [1, 5, 10, 25, 50, 100, 200, 500])).toBe(3237134);
  });

  it('...', () => {
    expect(combinations(2000, [1, 5, 10, 25, 50, 100, 200, 500, 1000])).toBe(155848897);
  });

  it('...', () => {
    expect(combinations(5000, [1, 5, 10, 25, 50, 100, 200, 500, 1000, 2000])).toBe(58853234018);
  });

  it('...', () => {
    expect(combinations(10000, [1, 5, 10, 25, 50, 100, 200, 500, 1000, 2000, 5000])).toBe(
      9823546661905
    );
  });
});
