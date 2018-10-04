import { shuffle } from './in-place';

describe('...', () => {
  it('...', () => {
    const array = [...Array(10).keys()];
    shuffle(array);
    console.log(array);
  });

  it('...', () => {
    const array = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
    shuffle(array);
    console.log(array);
  });

  it('...', () => {
    const hash = { '0': 0, '1': 0, '2': 0 };
    const total = 1000;
    for (let i = 0; i < total; i++) {
      const array = ['a', 'b', 'c'];
      shuffle(array);
      hash[array.indexOf('a')]++;
    }
    const noVariance = percentRounding(1 / Object.keys(hash).length);
    const variance = Object.keys(hash).reduce((previous, current) => {
      const percent = percentRounding(hash[current] / total);
      previous += Math.abs(noVariance - percent);

      return previous;
    }, 0);

    expect(variance).toBeLessThan(6);
  });
});

function percentRounding(input) {
  return Math.round(input * 1000) / 10;
}
