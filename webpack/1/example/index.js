module.exports.default = () => `
  const otherFile = require('./other-file');
  console.log('Hello, ' + otherFile.default);
`;
