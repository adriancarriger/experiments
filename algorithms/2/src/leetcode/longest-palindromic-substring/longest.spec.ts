import longestPalindrome, { longestFromIndex } from './longest';

describe('...', () => {
  describe('longestPalindrome', () => {
    it('...', () => {
      expect(longestPalindrome('babad')).toBe('bab');
    });

    it('...', () => {
      expect(longestPalindrome('cbbd')).toBe('bb');
    });

    it('...', () => {
      expect(longestPalindrome('cbbbbd')).toBe('bbbb');
    });

    it('...', () => {
      expect(longestPalindrome('bracecarz')).toBe('racecar');
    });

    it('...', () => {
      expect(longestPalindrome('a')).toBe('a');
    });

    it('...', () => {
      expect(longestPalindrome('')).toBe('');
    });

    it('...', () => {
      expect(longestPalindrome('bb')).toBe('bb');
    });

    it('...', () => {
      expect(longestPalindrome('ccc')).toBe('ccc');
    });

    it('...', () => {
      expect(longestPalindrome('aaabaaaa')).toBe('aaabaaa');
    });

    it('...', () => {
      expect(longestPalindrome('tattarrattat')).toBe('tattarrattat');
    });

    it('...', () => {
      expect(longestPalindrome('abb')).toBe('bb');
    });

    it('...', () => {
      const longInput =
        'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb';
      expect(longestPalindrome(longInput)).toBe(longInput);
    });
  });

  describe('longestFromIndex', () => {
    it('', () => {
      expect(longestFromIndex('aba', 1)).toBe('aba');
    });

    it('', () => {
      expect(longestFromIndex('tattarrattat', 6)).toBe('tattarrattat');
    });

    it('...', () => {
      expect(longestFromIndex('abb', 2)).toBe('bb');
    });
  });
});
