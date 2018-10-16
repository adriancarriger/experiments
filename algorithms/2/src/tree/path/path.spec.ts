import { getPath } from './path';

const network = {
  Min: ['William', 'Jayden', 'Omar'],
  William: ['Min', 'Noam'],
  Jayden: ['Min', 'Amelia', 'Ren', 'Noam'],
  Ren: ['Jayden', 'Omar'],
  Amelia: ['Jayden', 'Adam', 'Miguel'],
  Adam: ['Amelia', 'Miguel', 'Sofia', 'Lucas'],
  Miguel: ['Amelia', 'Adam', 'Liam', 'Nathan'],
  Noam: ['Nathan', 'Jayden', 'William'],
  Omar: ['Ren', 'Min', 'Scott']
};

describe('...', () => {
  it('...', () => {
    const path = getPath(network, 'Omar', 'Amelia');
    expect(path).toEqual(['Omar', 'Ren', 'Jayden', 'Amelia']);
  });

  it('...', () => {
    const path = getPath(network, 'Omar', 'Noam');
    expect(path).toEqual(['Omar', 'Ren', 'Jayden', 'Noam']);
  });

  it('...', () => {
    const path = getPath(network, 'Min', 'Noam');
    expect(path).toEqual(['Min', 'William', 'Noam']);
  });

  it('...', () => {
    const path = getPath(network, 'William', 'Lucas');
    expect(path).toEqual(['William', 'Min', 'Jayden', 'Amelia', 'Adam', 'Lucas']);
  });

  it('...', () => {
    const path = getPath(network, 'Omar', 'Liam');
    expect(path).toEqual(['Omar', 'Ren', 'Jayden', 'Amelia', 'Miguel', 'Liam']);
  });
});
