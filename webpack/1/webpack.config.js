const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // target: 'node',
  mode: 'development',

  entry: {
    app: './example/index.🤖.js'
  },

  optimization: {
    minimize: false
  },

  plugins: [new CleanWebpackPlugin()],

  module: {
    rules: [
      {
        test: /\.🤖.js$/,
        use: [
          { loader: 'babel-loader' },
          { loader: path.resolve('src/🤖.js') },
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
