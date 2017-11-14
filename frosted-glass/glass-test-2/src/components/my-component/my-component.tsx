import { Component, Element, Listen, Prop } from '@stencil/core';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.scss'
})
export class MyComponent {
  @Prop() backgroundSelector: string;
  @Element() el: HTMLElement;

  @Listen('body:updateBackground')
  todoCompletedHandler() { this.onBackgroundUpdate() }

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

  onBackgroundUpdate() {
    this.requestBackgroundUpdateTick();
  }

  render() {
    return (
      <div>
        <slot />
      </div>
    );
  }

  private createNewElements() {
    this.blurContainer = document.createElement('div');
    this.blurContent = document.createElement('div');

    this.blurContainer.appendChild(this.blurContent);
    document.querySelector('body').appendChild(this.blurContainer);
    
    this.onBackgroundUpdate();
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

  private requestBackgroundUpdateTick () {
    if (!this.context.backgroundUpdateTicking) { requestAnimationFrame(this.backgroundUpdate.bind(this)); }
    this.context.backgroundUpdateTicking = true;
  }

  private backgroundUpdate() {
    this.background = document.querySelector(this.backgroundSelector);
    const blurId = `${Math.random()}`;
    this.el.dataset.blurId = blurId;
    const copy = document.importNode(this.background, true);
    copy.querySelector(`[data-blur-id="${blurId}"]`).remove();
    this.blurContent.innerHTML = ''
    this.blurContent.appendChild(copy);
  }
}
