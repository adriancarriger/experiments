import { xToY } from './x-to-y';
import { allRandoms, isRandom } from './spec-helpers';

describe('...', () => {
  it('5, 7', () => {
    const result = allRandoms(xToY, 5, 7);
    expect(isRandom(result)).toBe(true);
  });

  it('3, 5', () => {
    const result = allRandoms(xToY, 3, 5);
    expect(isRandom(result)).toBe(true);
  });

  it('6, 11', () => {
    const result = allRandoms(xToY, 6, 11);
    expect(isRandom(result)).toBe(true);
  });

  it('11, 21', () => {
    const result = allRandoms(xToY, 11, 21);
    expect(isRandom(result)).toBe(true);
  });

  it('7, 5', () => {
    const result = allRandoms(xToY, 7, 5);
    expect(isRandom(result)).toBe(true);
  });

  it('11, 3', () => {
    const result = allRandoms(xToY, 11, 3);
    expect(isRandom(result)).toBe(true);
  });

  it('2, 5', () => {
    expect(() => allRandoms(xToY, 2, 5)).toThrow();
  });

  it('3, 10', () => {
    expect(() => allRandoms(xToY, 3, 10)).toThrow();
  });

  it('4, 17', () => {
    expect(() => allRandoms(xToY, 4, 17)).toThrow();
  });

  it('5, 26', () => {
    expect(() => allRandoms(xToY, 5, 26)).toThrow();
  });
});
