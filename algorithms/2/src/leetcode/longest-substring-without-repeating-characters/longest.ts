export default (input: string) => {
  let longest = '';
  let current = '';

  const saveLongest = () => {
    if (current.length > longest.length) {
      longest = current;
    }
  };

  for (let i = 0; i < input.length; i++) {
    if (current.includes(input[i])) {
      saveLongest();

      current = current.slice(current.indexOf(input[i]) + 1);
    }

    current += input[i];
  }

  saveLongest();

  return longest.length;
};
