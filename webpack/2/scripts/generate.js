process.env.NODE_ENV = 'production';

const webpack = require('webpack');
const generateConfig = require('../webpack.config');

[
  { name: 'project-1', options: { myKey: 'myValue' } },
  { name: 'project-2' }
].forEach(project => {
  webpack(generateConfig(project), error => {
    if (error) {
      console.error(error);
    }
  });
});
