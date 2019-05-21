import longestCommonPrefix from './longest-common-prefix';

describe('...', () => {
  it('...', () => {
    expect(longestCommonPrefix(['flower', 'flow', 'flight'])).toBe('fl');
  });

  it('...', () => {
    expect(longestCommonPrefix(['flower', 'flower'])).toBe('flower');
  });

  it('...', () => {
    expect(longestCommonPrefix(['dog', 'racecar', 'car'])).toBe('');
  });

  it('...', () => {
    expect(longestCommonPrefix([])).toBe('');
  });
});
