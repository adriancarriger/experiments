export default Vue => {
  if (!Vue.extendsStyles) {
    Vue.extendsStyles = true
    Vue.extend = updateExtends(Vue, Vue.extend)
  }
}

function updateExtends(Vue, originalExtends) {
  return function (component) {
    if (component.extendsScopedStyle) {
      const childName = getComponentName(component.extends)
      registerComponent(Vue, childName, component.extends)
      component = wrapComponent(childName, component)
    }
    return originalExtends.call(this, component);
  }
}

function wrapComponent(name, component) {
  delete component.extends
  delete component.extendsScopedStyle

  return {
    ...component,
    functional: true,
    render: (createElement, context) => createElement(name, context.data, context.children)
  }
}

function getComponentName(component) {
  if (component.name) {
    return component.name
  }
  const randomNumber = Math.round(Math.random() * 100000)
  return `extended-${randomNumber}`
}

function registerComponent(Vue, name, component) {
  if (!Object.keys(Vue.options.components).includes(name)) {
    Vue.component(name, component)
  }
}
