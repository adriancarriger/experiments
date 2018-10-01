import { hasPalindromePermutation } from './permutations';

describe('...', () => {
  it('checks for permutations with odd number of chars', () => {
    expect(hasPalindromePermutation('aabcbcd')).toBe(true);
  });

  it('checks for permutations with even number of chars', () => {
    expect(hasPalindromePermutation('aabccbdd')).toBe(true);
  });

  it('checks for permutations with odd number of chars', () => {
    expect(hasPalindromePermutation('aabcd')).toBe(false);
  });

  it('checks for permutations with even number of chars', () => {
    expect(hasPalindromePermutation('aabbcd')).toBe(false);
  });

  it('checks for permutations in an empty string', () => {
    expect(hasPalindromePermutation('')).toBe(true);
  });

  it('checks for permutations with a one character string', () => {
    expect(hasPalindromePermutation('a')).toBe(true);
  });
});
