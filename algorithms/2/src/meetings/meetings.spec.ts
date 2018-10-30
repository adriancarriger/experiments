import mergeRanges from './meetings';

describe('...', () => {
  it('...', () => {
    const actual = mergeRanges([{ startTime: 1, endTime: 3 }, { startTime: 2, endTime: 4 }]);
    expect(actual).toEqual([{ startTime: 1, endTime: 4 }]);
  });

  it('...', () => {
    const actual = mergeRanges([{ startTime: 5, endTime: 6 }, { startTime: 6, endTime: 8 }]);
    expect(actual).toEqual([{ startTime: 5, endTime: 8 }]);
  });

  it('...', () => {
    const actual = mergeRanges([{ startTime: 1, endTime: 8 }, { startTime: 2, endTime: 5 }]);
    expect(actual).toEqual([{ startTime: 1, endTime: 8 }]);
  });

  it('...', () => {
    const actual = mergeRanges([
      { startTime: 1, endTime: 4 },
      { startTime: 2, endTime: 5 },
      { startTime: 5, endTime: 8 }
    ]);
    expect(actual).toEqual([{ startTime: 1, endTime: 8 }]);
  });

  it('...', () => {
    const actual = mergeRanges([
      { startTime: 5, endTime: 8 },
      { startTime: 1, endTime: 4 },
      { startTime: 6, endTime: 8 }
    ]);
    expect(actual).toEqual([{ startTime: 1, endTime: 4 }, { startTime: 5, endTime: 8 }]);
  });

  it('...', () => {
    const actual = mergeRanges([
      { startTime: 1, endTime: 10 },
      { startTime: 2, endTime: 5 },
      { startTime: 6, endTime: 8 },
      { startTime: 9, endTime: 10 },
      { startTime: 10, endTime: 12 }
    ]);
    expect(actual).toEqual([{ startTime: 1, endTime: 12 }]);
  });

  it('...', () => {
    const actual = mergeRanges([
      { startTime: 0, endTime: 1 },
      { startTime: 3, endTime: 5 },
      { startTime: 4, endTime: 8 },
      { startTime: 10, endTime: 12 },
      { startTime: 9, endTime: 10 }
    ]);
    expect(actual).toEqual([
      { startTime: 0, endTime: 1 },
      { startTime: 3, endTime: 8 },
      { startTime: 9, endTime: 12 }
    ]);
  });
});
