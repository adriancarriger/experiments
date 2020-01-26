const path = require('path');

module.exports = {
  // target: 'node',
  mode: 'development',

  entry: {
    app: './example/index.js'
  },

  optimization: {
    minimize: false
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{ loader: path.resolve('src/my-loader.js') }]
      }
    ]
  },
  stats: {
    colors: true
  }
};
