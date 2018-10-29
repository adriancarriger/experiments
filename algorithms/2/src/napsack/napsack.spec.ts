import maxDuffelBagValue from './napsack';

describe('...', () => {
  const cakeTypes = [{ weight: 7, value: 160 }, { weight: 3, value: 90 }, { weight: 2, value: 15 }];

  it('...', () => {
    expect(maxDuffelBagValue(cakeTypes, 7)).toBe(180);
  });

  it('...', () => {
    expect(maxDuffelBagValue(cakeTypes, 50)).toBe(1455);
  });

  it('...', () => {
    expect(maxDuffelBagValue(cakeTypes, 100)).toBe(2970);
  });
});

describe('...', () => {
  const cakeTypes = [{ weight: 0, value: 160 }, { weight: 3, value: 90 }, { weight: 2, value: 15 }];

  it('...', () => {
    expect(maxDuffelBagValue(cakeTypes, 7)).toBe(Infinity);
  });

  it('...', () => {
    expect(maxDuffelBagValue(cakeTypes, 0)).toBe(Infinity);
  });
});

describe('...', () => {
  const cakeTypes = [
    { weight: 7, value: 160 },
    { weight: 3, value: 90 },
    { weight: 2, value: 15 },
    { weight: 0, value: 0 }
  ];

  it('...', () => {
    expect(maxDuffelBagValue(cakeTypes, 7)).toBe(180);
  });

  it('...', () => {
    expect(maxDuffelBagValue(cakeTypes, 50)).toBe(1455);
  });

  it('...', () => {
    expect(maxDuffelBagValue(cakeTypes, 100)).toBe(2970);
  });
});
