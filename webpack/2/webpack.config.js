const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const globby = require('globby');

module.exports = project => ({
  mode: 'development',

  entry: globby.sync(['./example/**/*.🤖.js', './example/**/*.txt']),

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
          {
            loader: path.resolve('src/🤖.js'),
            options: {
              basePath: project.name,
              options: project.options || {}
            }
          },
          {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env', { modules: 'commonjs' }]]
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|txt)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: `${project.name}/[path][name].[ext]`
            }
          }
        ]
      }
    ]
  },
  stats: {
    colors: true
  }
});
