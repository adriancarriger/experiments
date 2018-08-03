export default Vue => {
  if (!Vue.extendsStyles) {
    Vue.extendsStyles = true
    Vue.extend = updateExtends(Vue, Vue.extend)
  }
}


function updateExtends(Vue, originalExtends) {
  return function (component) {
    if (arguments[0].extendsScopedStyle) {
      const randomNumber = Math.round(Math.random() * 100000)
      const randomName = `extended-${randomNumber}`
      Vue.component(randomName, arguments[0].extends)
      arguments[0] = {
        ...arguments[0],
        functional: true,
        extends: undefined,
        render: function (createElement, context) {
          return createElement(randomName, context.data, context.children)
        }
      }
    }
    return originalExtends.apply(this, arguments);
  };
};
