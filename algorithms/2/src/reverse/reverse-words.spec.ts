import { reverseWords } from './reverse-words';

describe('Reverse words', () => {
  let input;

  it('reverses one word', () => {
    setInput('vault');
    reverseWords(input);
    assertInput('vault');
  });

  it('reverses two word', () => {
    setInput('thief cake');
    reverseWords(input);
    assertInput('cake thief');
  });

  it('reverses three word', () => {
    setInput('one another get');
    reverseWords(input);
    assertInput('get another one');
  });

  it('reverses multiple words with the same length', () => {
    setInput('rat the ate cat the');
    reverseWords(input);
    assertInput('the cat ate the rat');
  });

  it('reverses multiple words with different lengths', () => {
    setInput('yummy is cake bundt chocolate');
    reverseWords(input);
    assertInput('chocolate bundt cake is yummy');
  });

  it('reverses an empty string', () => {
    setInput('');
    reverseWords(input);
    assertInput('');
  });

  function setInput(inputString: string) {
    input = inputString.split('');
  }

  function assertInput(expected: string) {
    expect(input.join('')).toBe(expected);
  }
});
