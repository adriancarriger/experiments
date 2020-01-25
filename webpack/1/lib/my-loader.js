module.exports = function loader(source) {
  const result = eval(source)();
  console.log('result', result);

  return '';
};
