import { findDuplicate } from './duplicate';

describe('...', () => {
  it('...', () => {
    const duplicate = 5;
    const result = findDuplicate(getInput(10, duplicate));
    expect(result).toBe(duplicate);
  });

  it('...', () => {
    const duplicate = 2;
    const result = findDuplicate(getInput(100, duplicate));
    expect(result).toBe(duplicate);
  });

  it('...', () => {
    const duplicate = 50;
    const result = findDuplicate(getInput(300, duplicate));
    expect(result).toBe(duplicate);
  });

  it('...', () => {
    const duplicate = 2;
    const result = findDuplicate(getInput(5, duplicate));
    expect(result).toBe(duplicate);
  });

  function getInput(amount, duplicate) {
    const input = numberArray(amount);
    input.unshift(duplicate);
    return input;
  }

  function numberArray(amount) {
    return [...Array(amount + 1).keys()].slice(1, amount + 1);
  }
});
