import { Component, Element, Prop } from '@stencil/core';


@Component({
  tag: 'my-component',
  styleUrl: 'my-component.scss',
  shadow: true
})
export class MyComponent {
  @Prop() first: string;
  @Prop() last: string;
  @Element() el: HTMLElement;
  
  context = {}

  componentDidLoad() {
    const context: any = this.context;
    const el: any = this.el
    const directions = ['top', 'left', 'right']
    const app = document.getElementById('app')
    this.el.classList.add('blur-1123')
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
    if (window.getComputedStyle(this.el).position === 'fixed') {
      window.addEventListener('scroll', onScroll)
    }
    window.addEventListener('resize', onResize)
    onResize()

    // Resizing
    function resizeUpdate () {
      const elementStyle = window.getComputedStyle(el)
      const appStyle = window.getComputedStyle(app)
      topOffset = parseInt(elementStyle.top, 10);

      ['position', 'height', ...directions].forEach((item) => {
        blurContainer.style[item] = elementStyle[item]
      })

      directions.forEach((item) => { blurContent.style[item] = `-${elementStyle[item]}` })
      blurContent.style.width = appStyle.width
      scrollUpdate()

      context.resizeTicking = false
    }

    function requestResizeTick () {
      if (!context.resizeTicking) { requestAnimationFrame(resizeUpdate) }
      context.resizeTicking = true
    }

    function onResize () {
      requestResizeTick()
    }

    // Scrolling
    function scrollUpdate () {
      const scrollOffset = context.latestKnownScrollY + topOffset
      blurContent.style.top = `-${scrollOffset}px`
      context.scrollTicking = false
    }

    function requestScrollTick () {
      if (!context.scrollTicking) { requestAnimationFrame(scrollUpdate) }
      context.scrollTicking = true
    }

    function onScroll () {
      context.latestKnownScrollY = window.scrollY
      requestScrollTick()
    }

  }

  render() {
    return (
      <div>
        <slot />
      </div>
    );
  }
}
