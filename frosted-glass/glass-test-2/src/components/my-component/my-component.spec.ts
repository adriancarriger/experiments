import { render } from '@stencil/core/testing';
import { MyComponent } from './my-component';

describe('my-component', () => {
  beforeAll(() => {
    window.requestAnimationFrame = (someFunction: any) => {
      setTimeout(someFunction)
      return 1
    }
  });

  it('should build', () => {
    expect(new MyComponent()).toBeTruthy();
  });

  let element;
  beforeEach(async () => {
    element = await render({
      components: [MyComponent],
      html: '<my-component></my-component>'
    });
  });

  it('should create background elements', () => {
    const instance = element._instance
    expect(instance.blurContainer).toBeDefined();
    expect(instance.blurContent).toBeDefined();
  });

  it('should create background styles', () => {
    const containerStyle = element._instance.blurContainer.style;
    expect(containerStyle.overflow).toEqual('hidden');
    expect(containerStyle.transform).toEqual('translate3d(0, 0, 0)');

    const contentStyle = element._instance.blurContent.style;
    expect(contentStyle.position).toEqual('absolute');
    expect(contentStyle.filter).toEqual('blur(5px)');
  });

  it('should change the blur amount', async () => {
    element.blurAmount = '10px';
    const contentStyle = element._instance.blurContent.style;
    expect(contentStyle.filter).toEqual('blur(10px)');
  });
});