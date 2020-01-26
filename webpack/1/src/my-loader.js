module.exports = source => {
  return eval(source)();
};
