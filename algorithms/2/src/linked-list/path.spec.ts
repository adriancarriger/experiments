import getFullPath from './path';

describe('...', () => {
  it('...', () => {
    const paths = [
      ['item-2', 'item-3'],
      ['item-5', 'item-6'],
      ['item-3', 'item-4'],
      ['item-1', 'item-2'],
      ['item-4', 'item-5']
    ];
    expect(getFullPath(paths)).toEqual([
      'item-1',
      'item-2',
      'item-3',
      'item-4',
      'item-5',
      'item-6'
    ]);
  });
});
