import { findDuplicates } from './files';

describe('...', () => {
  it('...', () => {
    const files = [
      { name: 'a.txt', shasum: 'e22936de1e5f31dc500cd77995ce088c2dcd8a8f' },
      { name: 'b.txt', shasum: 'e22936de1e5f31dc500cd77995ce088caaaaaaaa' },
      { name: 'c.txt', shasum: 'e22936de1e5f31dc500cd77995ce088c2dcd8a8f' },
      { name: 'd.txt', shasum: 'e22936de1e5f31dc500cd77995ce088czzzzzzzz' },
      { name: 'e.txt', shasum: 'e22936de1e5f31dc500cd77995ce088cwwwwwwww' },
      { name: 'f.txt', shasum: 'e22936de1e5f31dc500cd77995ce088czzzzzzzz' }
    ];
    expect(findDuplicates(files)).toEqual([['a.txt', 'c.txt'], ['d.txt', 'f.txt']]);
  });
});
