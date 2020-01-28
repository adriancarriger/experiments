const loaderUtils = require('loader-utils');
const prettier = require('prettier');

module.exports = function(source) {
  const options = loaderUtils.getOptions(this) || {};

  const basePath = options.basePath ? `${options.basePath}/` : '';
  const { options: myOptions } = options;
  console.log('options', JSON.stringify(options));

  const context = options.context || this.rootContext;

  const url = loaderUtils.interpolateName(
    this,
    options.name || `${basePath}[path]/[name].[ext]`,
    {
      context,
      source,
      regExp: options.regExp
    }
  );

  let emitFileName = url.split('.🤖').join('');

  const parts = emitFileName.split('.');

  const isJavascript = parts.length <= 2;
  const fileType = isJavascript ? 'babel' : parts[parts.length - 2];

  const compiledSource = compile(source, fileType, myOptions);

  if (!isJavascript) {
    emitFileName = parts.slice(0, -1).join('.');
  }

  this.emitFile(emitFileName, compiledSource.split('.🤖').join(''));

  if (isJavascript) {
    return compiledSource;
  }
};

function compile(source, parser, options) {
  let compiledSource = eval(source)(options);

  if (typeof compiledSource !== 'string') {
    compiledSource = JSON.stringify(compiledSource);
  }

  return prettier.format(compiledSource, { parser });
}
