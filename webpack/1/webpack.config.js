const path = require('path');

module.exports = {
  target: 'node',

  entry: {
    app: './src/index.js',
    markdown: './src/hi.md'
  },

  // output: {
  //   filename: '[name].js'
  // },

  mode: 'production',
  optimization: {
    minimize: false,
    splitChunks: {
      // include all types of chunks
      chunks: 'all'
    }
  },

  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|js)$/i,
        use: [
          {
            // loader: 'file-loader'
            loader: path.resolve('lib/my-loader.js')
          }
        ]
      },
      {
        test: /\.md$/,
        use: [{ loader: path.resolve('lib/markdown-loader.js') }, { loader: 'raw-loader' }]
      }
    ]
  }
};
