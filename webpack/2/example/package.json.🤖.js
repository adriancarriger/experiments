const prettier = '^1.19.1';

export default myOptions => ({
  name: '1',
  version: '1.0.0',
  private: true,
  license: 'MIT',
  scripts: {
    webpack: 'webpack',
    test: 'webpack && node ./dist/app.js',
    start: 'webpack --watch'
  },
  devDependencies: {
    webpack: '^5.0.0-beta.12',
    'webpack-cli': '^4.0.0-beta.1'
  },
  dependencies: {
    '@babel/core': '^7.8.3',
    '@babel/preset-env': '^7.8.3',
    'babel-loader': '^8.0.6',
    'clean-webpack-plugin': '^3.0.0',
    'file-loader': '^5.0.2',
    globby: '^11.0.0',
    prettier,
    myTest: myOptions.myKey
  }
});
