import { permutations } from './string';
import { seven } from './seven';

describe('...', () => {
  it('finds permutations', () => {
    const set = permutations('123');
    const expected = new Set(['123', '132', '213', '231', '312', '321']);
    expect(set.size).toBe(6);
    expected.forEach(expectedValue => expect(set.has(expectedValue)).toBeTruthy);
  });

  it('finds permutations', () => {
    const set = permutations('1234');
    const expected = oneTwoThreeFour();
    expect(set.size).toBe(24);
    expected.forEach(expectedValue => expect(set.has(expectedValue)).toBeTruthy);
  });

  it('finds permutations', () => {
    const set = permutations('cats');
    const expected = cats();
    expect(set.size).toBe(24);
    expected.forEach(expectedValue => expect(set.has(expectedValue)).toBeTruthy);
  });

  it('finds permutations', () => {
    const set = permutations('1234567');
    const expected = seven;
    expect(set.size).toBe(5040);
    expected.forEach(expectedValue => expect(set.has(expectedValue)).toBeTruthy);
  });
});

function oneTwoThreeFour() {
  return new Set([
    '1234',
    '1243',
    '1324',
    '1342',
    '1423',
    '1432',
    '2134',
    '2143',
    '2314',
    '2341',
    '2413',
    '2431',
    '3124',
    '3142',
    '3214',
    '3241',
    '3412',
    '3421',
    '4123',
    '4132',
    '4213',
    '4231',
    '4312',
    '4321'
  ]);
}

function cats() {
  return new Set([
    'cats',
    'cast',
    'ctas',
    'ctsa',
    'csat',
    'csta',
    'acts',
    'acst',
    'atcs',
    'atsc',
    'asct',
    'astc',
    'tcas',
    'tcsa',
    'tacs',
    'tasc',
    'tsca',
    'tsac',
    'scat',
    'scta',
    'sact',
    'satc',
    'stca',
    'stac'
  ]);
}
