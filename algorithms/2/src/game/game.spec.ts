import { sortScores } from './game';

describe('...', () => {
  it('...', () => {
    const sortedScores = getSorted([37, 89, 41, 65, 91, 53]);
    expect(sortedScores).toEqual([91, 89, 65, 53, 41, 37]);
  });

  it('...', () => {
    const sortedScores = getSorted([20, 37, 8, 89, 20, 20, 53]);
    expect(sortedScores).toEqual([89, 53, 37, 20, 20, 20, 8]);
  });

  function getSorted(unsorted) {
    const HIGHEST_POSSIBLE_SCORE = 100;

    return sortScores(unsorted, HIGHEST_POSSIBLE_SCORE);
  }
});
