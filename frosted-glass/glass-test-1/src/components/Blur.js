export default {
  inserted (el, binding, vnode) {
    const position = window.getComputedStyle(el).position
    if (position !== 'fixed') { return }

    const app = vnode.context.$root.$el
    el.classList.add('blur-1123')
    const copy = document.importNode(app, true)
    copy.querySelector('.blur-1123').remove()

    const blurContainer = document.createElement('div')
    const blurContent = document.createElement('div')
    let topOffset = 0

    // Styles
    Object.assign(blurContainer.style, {
      overflow: 'hidden',
      transform: 'translate3d(0, 0, 0)'
    })

    Object.assign(blurContent.style, {
      position: 'absolute',
      filter: 'blur(5px)'
    })

    blurContent.appendChild(copy)
    blurContainer.appendChild(blurContent)
    document.querySelector('body').appendChild(blurContainer)

    // Setup
    window.addEventListener('scroll', onScroll)
    window.addEventListener('resize', onResize)
    onResize()

    function onResize () {
      const elementStyle = window.getComputedStyle(el)
      const appStyle = window.getComputedStyle(app)
      topOffset = parseInt(elementStyle.top, 10);

      ['position', 'height', 'top', 'left', 'right'].forEach((item) => {
        blurContainer.style[item] = elementStyle[item]
      });

      ['top', 'right', 'left'].forEach((item) => {
        blurContent.style[item] = `-${elementStyle[item]}`
      })

      blurContent.style.width = appStyle.width
      requestTick()
    }

    function update () {
      const scrollOffset = vnode.context.latestKnownScrollY + topOffset
      blurContent.style.top = `-${scrollOffset}px`
      vnode.context.ticking = false
    }

    function requestTick () {
      if (!vnode.context.ticking) { requestAnimationFrame(update) }
      vnode.context.ticking = true
    }

    function onScroll () {
      vnode.context.latestKnownScrollY = window.scrollY
      requestTick()
    }
  }
}
