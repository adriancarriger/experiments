module.exports = {
  exportPathMap: async function(defaultPathMap) {
    return {
      ...defaultPathMap,
      '/special-route': { page: '/test2' }
    };
  }
};
