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

  directions = ['top', 'left', 'right'];
  topOffset = 0;
  context: any = {};
  blurContainer: HTMLElement;
  blurContent: HTMLElement;
  app: HTMLElement;

  componentDidLoad() {
    this.app = document.getElementById('app');
    this.el.classList.add('blur-1123');
    const copy = document.importNode(this.app, true);
    copy.querySelector('.blur-1123').remove();

    this.blurContainer = document.createElement('div');
    this.blurContent = document.createElement('div');

    // Styles
    Object.assign(this.blurContainer.style, {
      overflow: 'hidden',
      transform: 'translate3d(0, 0, 0)'
    });

    Object.assign(this.blurContent.style, {
      position: 'absolute',
      filter: 'blur(5px)'
    });

    this.blurContent.appendChild(copy);
    this.blurContainer.appendChild(this.blurContent);
    document.querySelector('body').appendChild(this.blurContainer);

    // Setup
    if (window.getComputedStyle(this.el).position === 'fixed') {
      window.addEventListener('scroll', this.onScroll.bind(this));
    }
    window.addEventListener('resize', this.onResize.bind(this));
    this.onResize();
  }

  // Resizing
  resizeUpdate () {
    const elementStyle = window.getComputedStyle(this.el);
    const appStyle = window.getComputedStyle(this.app);
    this.topOffset = parseInt(elementStyle.top, 10);

    ['position', 'height', ...this.directions].forEach((item) => {
      this.blurContainer.style[item] = elementStyle[item];
    })

    this.directions.forEach((item) => { this.blurContent.style[item] = `-${elementStyle[item]}` });
    this.blurContent.style.width = appStyle.width;

    this.onScroll();

    this.context.resizeTicking = false;
  }

  requestResizeTick () {
    if (!this.context.resizeTicking) { requestAnimationFrame(this.resizeUpdate.bind(this)); }
    this.context.resizeTicking = true;
  }

  onResize () {
    this.requestResizeTick();
  }

  // Scrolling
  scrollUpdate () {
    const scrollOffset = this.context.latestKnownScrollY + this.topOffset;
    this.blurContent.style.top = `-${scrollOffset}px`;
    this.context.scrollTicking = false;
  }

  requestScrollTick () {
    if (!this.context.scrollTicking) { requestAnimationFrame(this.scrollUpdate.bind(this)); }
    this.context.scrollTicking = true;
  }

  onScroll () {
    this.context.latestKnownScrollY = window.scrollY;
    this.requestScrollTick();
  }

  render() {
    return (
      <div>
        <slot />
      </div>
    );
  }
}
