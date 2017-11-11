export default {
  data () {
    return {
      ticking: false
    }
  },
  inserted (el, binding, vnode) {
    const position = window.getComputedStyle(el).position
    if (position !== 'fixed') { return }

    const app = vnode.context.$root.$el
    el.classList.add('blur-1123')
    const copy = document.importNode(app, true)
    copy.querySelector('.blur-1123').remove()

    const blurContainer = document.createElement('div')
    const blurContent = document.createElement('div')

    blurContainer.style.position = 'fixed'
    blurContainer.style.top = `${app.offsetTop}px`
    blurContainer.style.left = '0'
    blurContainer.style.right = '0'
    blurContainer.style.height = '100px'
    blurContainer.style.overflow = 'hidden'
    blurContainer.style.transform = 'translate3d(0, 0, 0)'

    blurContent.style.position = 'absolute'
    blurContent.style.top = '0'
    blurContent.style.left = '0'
    blurContent.style.right = '0'
    blurContent.style.filter = 'blur(5px)'

    blurContent.appendChild(copy)
    blurContainer.appendChild(blurContent)
    document.querySelector('body').appendChild(blurContainer)

    function update () {
      blurContent.style.top = `-${vnode.context.latestKnownScrollY}px`
      vnode.context.ticking = false
    }

    function requestTick () {
      if (!vnode.context.ticking) {
        requestAnimationFrame(update)
      }
      vnode.context.ticking = true
    }

    function onScroll () {
      vnode.context.latestKnownScrollY = window.scrollY
      requestTick()
    }

    window.addEventListener('scroll', onScroll)
  }
}
