import { Component, Element, Listen, Prop, PropWillChange } from '@stencil/core';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.scss'
})
export class MyComponent {
  @Prop() backgroundSelector: string;
  @Prop() blurAmount = '5px';

  @PropWillChange('blurAmount')
  blurAmountChangeHandler(newValue: string) {
    this.updateFilter(newValue);
  }

  @Element() el: HTMLElement;

  @Listen('body:updateBackground')
  backgroundUpdatedHandler() { this.onBackgroundUpdate(); }

  private directions: string[] = ['top', 'left', 'right'];
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

  componentDidUnload() {
    this.removeElements();
    this.removeListeners();
  }

  onResize() {
    this.requestResizeTick();
  }

  onScroll() {
    this.context.latestKnownScrollY = window.scrollY;
    this.requestScrollTick();
  }

  onBackgroundUpdate() {
    this.requestBackgroundUpdateTick();
  }

  render() {
    return (
      <slot />
    );
  }

  private createNewElements() {
    this.blurContainer = document.createElement('div');
    this.blurContent = document.createElement('div');

    this.blurContainer.appendChild(this.blurContent);
    document.querySelector('body').appendChild(this.blurContainer);

    this.onBackgroundUpdate();
  }

  private removeElements() {
    this.blurContainer.remove();
  }

  private removeListeners() {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onResize);
  }

  private addBaseStyles() {
    Object.assign(this.blurContainer.style, {
      overflow: 'hidden',
      transform: 'translate3d(0, 0, 0)'
    });

    this.blurContent.style.position = 'absolute';
    this.updateFilter(this.blurAmount);
  }

  private updateFilter(blurAmount) {
    this.blurContent.style.filter = `blur(${blurAmount})`;
  }

  private initListeners() {
    if (window.getComputedStyle(this.el).position === 'fixed') {
      this.onScroll = this.onScroll.bind(this);
      window.addEventListener('scroll', this.onScroll);
    }
    this.onResize = this.onResize.bind(this);
    window.addEventListener('resize', this.onResize);
    this.onResize();
    this.onScroll();
  }

  private resizeUpdate() {
    const elementStyle = window.getComputedStyle(this.el);
    const appStyle = window.getComputedStyle(this.background);
    this.topOffset = parseInt(elementStyle.top, 10);

    ['position', 'height', ...this.directions].forEach((item) => {
      this.blurContainer.style[item] = elementStyle[item];
    });

    this.directions.forEach((item) => { this.blurContent.style[item] = `-${elementStyle[item]}`; });
    this.blurContent.style.width = appStyle.width;
    this.scrollUpdate();
    this.context.resizeTicking = false;
  }

  private requestResizeTick() {
    if (!this.context.resizeTicking) { requestAnimationFrame(this.resizeUpdate.bind(this)); }
    this.context.resizeTicking = true;
  }
  
  private scrollUpdate() {
    const scrollOffset = this.context.latestKnownScrollY + this.topOffset;
    this.blurContent.style.top = `-${scrollOffset}px`;
    this.context.scrollTicking = false;
  }

  private requestScrollTick() {
    if (!this.context.scrollTicking) { requestAnimationFrame(this.scrollUpdate.bind(this)); }
    this.context.scrollTicking = true;
  }

  private requestBackgroundUpdateTick() {
    if (!this.context.backgroundUpdateTicking) { requestAnimationFrame(this.backgroundUpdate.bind(this)); }
    this.context.backgroundUpdateTicking = true;
  }

  private backgroundUpdate() {
    this.background = document.querySelector(this.backgroundSelector);
    const blurId = `${Math.random()}`;
    this.el.dataset.blurId = blurId;
    const backgroundClone = document.importNode(this.background, true);
    backgroundClone.querySelector(`[data-blur-id="${blurId}"]`).remove();
    this.blurContent.innerHTML = '';
    this.blurContent.appendChild(backgroundClone);
  }
}
