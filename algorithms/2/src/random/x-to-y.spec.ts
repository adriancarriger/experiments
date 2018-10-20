import { xToY } from './x-to-y';
import { allRandoms, isRandom } from './spec-helpers';

describe('...', () => {
  it('...', () => {
    const result = allRandoms(xToY, 5, 7);
    expect(isRandom(result)).toBe(true);
  });

  it('...', () => {
    const result = allRandoms(xToY, 3, 5);
    expect(isRandom(result)).toBe(true);
  });

  it('...', () => {
    const result = allRandoms(xToY, 6, 11);
    expect(isRandom(result)).toBe(true);
  });

  it('...', () => {
    const result = allRandoms(xToY, 2, 11);
    expect(isRandom(result)).toBe(true);
  });

  it('...', () => {
    const result = allRandoms(xToY, 11, 21);
    expect(isRandom(result)).toBe(true);
  });

  it('...', () => {
    const result = allRandoms(xToY, 7, 5);
    expect(isRandom(result)).toBe(true);
  });

  it('...', () => {
    const result = allRandoms(xToY, 11, 3);
    expect(isRandom(result)).toBe(true);
  });
});
