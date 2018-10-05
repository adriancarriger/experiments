import { findRotationPoint } from './binary';

const words = [
  'ptolemaic',
  'retrograde',
  'supplant',
  'undulate',
  'xenoepist',
  'asymptote',
  'babka',
  'banoffee',
  'engender',
  'karpatka',
  'othellolagkage'
];

describe('...', () => {
  it('...', () => {
    const result = findRotationPoint(words);
    expect(result).toBe(5);
  });

  it('...', () => {
    const input = [...words].sort();
    const result = findRotationPoint(input);
    expect(result).toBe(0);
  });

  it('...', () => {
    const input = [...words].sort();
    const firstItem = input.shift();
    const result = findRotationPoint([...input, firstItem]);
    expect(result).toBe(10);
  });

  it('...', () => {
    const input = [
      'xenoepist',
      'asymptote',
      'babka',
      'banoffee',
      'engender',
      'karpatka',
      'othellolagkage',
      'ptolemaic',
      'retrograde',
      'supplant',
      'undulate'
    ];
    const result = findRotationPoint(input);
    expect(result).toBe(1);
  });

  it('...', () => {
    const input = [
      'banoffee',
      'engender',
      'karpatka',
      'othellolagkage',
      'ptolemaic',
      'retrograde',
      'supplant',
      'undulate',
      'xenoepist',
      'asymptote',
      'babka'
    ];
    const result = findRotationPoint(input);
    expect(result).toBe(9);
  });
});
