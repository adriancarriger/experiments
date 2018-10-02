import { countWords } from './counts';

describe('...', () => {
  let wordMap;

  it('...', () => {
    wordMap = countWords('After beating the eggs, Dana read the next step:');
    expect(wordMap.get('the')).toEqual(2);
    expect(wordMap.get('next')).toEqual(1);
  });

  it('...', () => {
    wordMap = countWords('Add milk and eggs, then add flour and sugar.');
    expect(wordMap.get('add')).toEqual(2);
    expect(wordMap.get('add')).toEqual(2);
    expect(wordMap.get('flour')).toEqual(1);
  });

  it('...', () => {
    wordMap = countWords(
      "We came, we saw, we conquered...then we ate Bill's (Mille-Feuille) cake."
    );
    expect(wordMap.get('we')).toEqual(4);
    expect(wordMap.get('mille-feuille')).toEqual(1);
  });
});
