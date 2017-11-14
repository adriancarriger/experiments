import { Component, Element, Prop } from '@stencil/core';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.scss'
})
export class MyComponent {
  @Prop() backgroundSelector: string;
  @Element() el: HTMLElement;

  private directions = ['top', 'left', 'right'];
  private topOffset = 0;
  private context: any = {};
  private blurContainer: HTMLElement;
  private blurContent: HTMLElement;
  private background: Element;

  componentDidLoad() {
    this.createNewElements();
    this.addBaseStyles();
    this.initListeners();
  }

  onResize () {
    this.requestResizeTick();
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

  private createNewElements() {
    this.background = document.querySelector(this.backgroundSelector);
    this.el.classList.add('blur-1123');
    const copy = document.importNode(this.background, true);
    copy.querySelector('.blur-1123').remove();

    this.blurContainer = document.createElement('div');
    this.blurContent = document.createElement('div');

    this.blurContent.appendChild(copy);
    this.blurContainer.appendChild(this.blurContent);
    document.querySelector('body').appendChild(this.blurContainer);
  }

  private addBaseStyles() {
    Object.assign(this.blurContainer.style, {
      overflow: 'hidden',
      transform: 'translate3d(0, 0, 0)'
    });

    Object.assign(this.blurContent.style, {
      position: 'absolute',
      filter: 'blur(5px)'
    });
  }

  private initListeners() {
    if (window.getComputedStyle(this.el).position === 'fixed') {
      window.addEventListener('scroll', this.onScroll.bind(this));
    }
    window.addEventListener('resize', this.onResize.bind(this));
    this.onResize();
  }

  private resizeUpdate () {
    const elementStyle = window.getComputedStyle(this.el);
    const appStyle = window.getComputedStyle(this.background);
    this.topOffset = parseInt(elementStyle.top, 10);

    ['position', 'height', ...this.directions].forEach((item) => {
      this.blurContainer.style[item] = elementStyle[item];
    })

    this.directions.forEach((item) => { this.blurContent.style[item] = `-${elementStyle[item]}` });
    this.blurContent.style.width = appStyle.width;
    this.onScroll();
    this.context.resizeTicking = false;
  }

  private requestResizeTick () {
    if (!this.context.resizeTicking) { requestAnimationFrame(this.resizeUpdate.bind(this)); }
    this.context.resizeTicking = true;
  }
  
  private scrollUpdate () {
    const scrollOffset = this.context.latestKnownScrollY + this.topOffset;
    this.blurContent.style.top = `-${scrollOffset}px`;
    this.context.scrollTicking = false;
  }

  private requestScrollTick () {
    if (!this.context.scrollTicking) { requestAnimationFrame(this.scrollUpdate.bind(this)); }
    this.context.scrollTicking = true;
  }
}
