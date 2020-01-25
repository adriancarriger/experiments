const myVar = 'test';

module.exports = () => `
  import react from 'react';

  var test = '${myVar}';

  return test;
`;
