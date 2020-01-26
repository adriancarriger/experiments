const loaderUtils = require('loader-utils');
const prettier = require('prettier');

module.exports = function(source) {
  const options = loaderUtils.getOptions(this) || {};

  const compiledSource = compile(source);

  const context = options.context || this.rootContext;

  const url = loaderUtils.interpolateName(
    this,
    options.name || '[path]/[name].[ext]',
    {
      context,
      source,
      regExp: options.regExp
    }
  );

  this.emitFile(url, compiledSource);

  return compiledSource;
};

function compile(source) {
  const compiledSource = eval(source)();

  return prettier.format(compiledSource, { parser: 'babel' });
}
