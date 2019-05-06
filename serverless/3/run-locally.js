const { streamFilesToZip } = require('./handler');

(async () => {
  await streamFilesToZip({ directory: 'test-1' });
})();
