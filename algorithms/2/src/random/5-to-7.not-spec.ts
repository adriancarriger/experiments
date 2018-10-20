import { rand7Fail, rand7 } from './5-to-7';
import { allRandoms, isRandom } from './spec-helpers';

describe('...', () => {
  it('...', () => {
    const result = allRandoms(rand7Fail, 5, 7);
    expect(isRandom(result)).toBe(false);
  });

  it('...', () => {
    const result = allRandoms(rand7, 5, 7);
    expect(isRandom(result)).toBe(true);
  });
});
