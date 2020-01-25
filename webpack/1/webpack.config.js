const path = require('path');

module.exports = {
  target: 'node',

  entry: {
    app: './src/index.js'
  },

  mode: 'production',
  optimization: {
    minimize: false
  },

  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|js)$/i,
        use: [{ loader: path.resolve('lib/my-loader.js') }]
      }
    ]
  }
};
