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
        use: [
          { loader: 'babel-loader' },
          { loader: path.resolve('src/my-loader.js') },
          {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env', { modules: 'commonjs' }]]
            }
          }
        ]
      }
    ]
  },
  stats: {
    colors: true
  }
};
