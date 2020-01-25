const loaderUtils = require('loader-utils');

var imageRE = /(\!\[[^\]]*\]\([^\)]+\))/g;
module.exports = function(content) {
  console.log('hi', content);

  return content;
  // return 'module.exports = ' + JSON.stringify(content);
  // return (
  //   'module.exports = [\n' +
  //   content
  //     .split(imageRE)
  //     .map(requestImage)
  //     .join(',\n') +
  //   '\n].join();'
  // );
};

// var partRE = /(\!\[[^\]]*\]\()([^\)]+)(\))/g;
// function requestImage(markdownItem) {
//   var parts = partRE.exec(markdownItem);
//   if (parts) {
//     var request = loaderUtils.stringifyRequest(loaderUtils.urlToRequest(parts[2]));
//     return [JSON.stringify(parts[1]), 'require(' + request + ')', JSON.stringify(parts[3])].join(
//       ' + '
//     );
//   }
//   return JSON.stringify(markdownItem);
// }
