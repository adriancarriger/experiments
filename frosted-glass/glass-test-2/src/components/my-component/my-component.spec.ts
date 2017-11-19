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
  let instance;
  let background;
  async function updateElementBackground(content) {
    await updateBackground(background, element, content)
  }
  beforeEach(async () => {
    background = createTestBackground('test-background');
    element = await createComponent();
    instance = element._instance;
    await timeoutPromise();
  });

  afterEach(() => {
    removeTestBackground('test-background');
    instance.componentDidUnload();
  });

  it('should create background elements', async () => {
    expect(instance.blurContainer).toBeDefined();
    expect(instance.blurContent).toBeDefined();
    expect(instance.blurContainer.innerHTML).toContain('Some content');
  });

  it('should create background styles', () => {
    const containerStyle = instance.blurContainer.style;
    expect(containerStyle.overflow).toEqual('hidden');
    expect(containerStyle.transform).toEqual('translate3d(0, 0, 0)');

    const contentStyle = instance.blurContent.style;
    expect(contentStyle.position).toEqual('absolute');
    expect(contentStyle.filter).toEqual('blur(5px)');
  });

  it('should change the blur amount', async () => {
    element.blurAmount = '10px';
    const contentStyle = instance.blurContent.style;
    expect(contentStyle.filter).toEqual('blur(10px)');
  });

  it('should update background element', async () => {
    expect(instance.blurContainer.innerHTML).toContain('Some content');
    await updateElementBackground('<div id="some-content">Some other content</div>');
    expect(instance.blurContainer.innerHTML).toContain('Some other content');
  });

  it('should not update background element when ticking', async () => {
    instance.ticking.backgroundUpdate = true;
    await updateElementBackground('<div id="some-content">Some other content</div>');
    expect(instance.blurContainer.innerHTML).not.toContain('Some other content');
  });

  it('should remove self copies from the background blur', async () => {
    await updateElementBackground(`
      <div data-blur-id="${instance.blurId}">this should be removed</div>
      <div id="some-content">Some other content</div>
    `);
    expect(instance.blurContainer.innerHTML).not.toContain('this should be removed');
  });

  it('should not update background when missing a selector', async () => {
    expect(instance.blurContainer.innerHTML).toContain('Some content');
    instance.__el._values.backgroundSelector = undefined;
    await updateElementBackground('<div id="some-content">Some other content</div>');
    expect(instance.blurContainer.innerHTML).not.toContain('Some other content');
  });

  it('should unload', async () => {
    const blurContainer = () => document.getElementById(`blur-container-${instance.blurId}`);
    expect(blurContainer()).toBeDefined();
    instance.componentDidUnload();
    expect(blurContainer()).toBeNull();
    
  });

  it('should bind onScroll if position is fixed', async () => {
    const fixedElement = await createComponent('fixed');
    expect(isBound(element._instance.onScroll)).toBe(false);
    expect(isBound(fixedElement._instance.onScroll)).toBe(true);
  });
});

function timeoutPromise(someFunction = () => {}, time = 0) {
  return new Promise((resolve) => {
    setTimeout(() => {
      someFunction();
      resolve();
    }, time);
  })
}

function createTestBackground(id) {
  const background = document.createElement('div');
  background.setAttribute('id', id);
  background.innerHTML = '<div id="some-content">Some content</div>';
  document.querySelector('body').appendChild(background);
  return document.getElementById(id);
}

function removeTestBackground(id) {
  document.getElementById(id).remove();
}

async function updateBackground(background, element, newContent) {
  background.innerHTML = newContent;
  element._instance.updateBackground();
  await timeoutPromise();
}

function isBound(inputFunction) {
  return inputFunction.prototype === undefined
}

async function createComponent(position?: string) {
  const style = position ? `style="position:${position}" `: ''
  const fixedElement = await render({
    components: [MyComponent],
    html: `
      <my-component ${style}backgroundSelector="#test-background"></my-component>
    `
  });
  await timeoutPromise();
  return fixedElement;
}
