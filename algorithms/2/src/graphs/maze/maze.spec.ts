import shortestPath from './maze';

const maze = [
  [1, 0, 1, 1, 1, 1, 0, 1, 1, 1], // 0
  [1, 0, 1, 0, 1, 1, 1, 0, 1, 1], // 1
  [1, 1, 1, 0, 1, 1, 0, 1, 0, 1], // 2
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 1], // 3
  [1, 1, 1, 0, 1, 1, 1, 0, 1, 0], // 4
  [1, 0, 1, 1, 1, 1, 0, 1, 0, 0], // 5
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 6
  [1, 0, 1, 1, 1, 1, 0, 1, 1, 1], // 7
  [1, 1, 0, 0, 0, 0, 1, 0, 0, 1] // 8
];
// 0, 1, 2, 3, 4, 5, 6, 7, 8, 9

describe('When using the shortest path', () => {
  it('…', () => {
    const { switchNode, steps } = shortestPath(maze, { x: 0, y: 0 }, { x: 2, y: 0 });
    assertSwitchCordinates(switchNode, 1, 0);
    assertBeforeAfter(steps, 4, 2);
  });

  it('…', () => {
    const { switchNode, steps } = shortestPath(maze, { x: 0, y: 0 }, { x: 4, y: 0 });
    assertSwitchCordinates(switchNode, 1, 0);
    assertBeforeAfter(steps, 5, 4);
  });

  it('…', () => {
    const { switchNode, steps } = shortestPath(maze, { x: 0, y: 0 }, { x: 5, y: 0 });
    assertSwitchCordinates(switchNode, 1, 0);
    assertBeforeAfter(steps, 6, 5);
  });

  it('…', () => {
    const { switchNode, steps } = shortestPath(maze, { x: 0, y: 0 }, { x: 9, y: 8 });
    assertSwitchCordinates(switchNode, 4, 6);
    assertBeforeAfter(steps, 23, 15);
  });
});

function assertSwitchCordinates({ x, y }, expectedX, expectedY) {
  expect(x).toBe(expectedX);
  expect(y).toBe(expectedY);
}

function assertBeforeAfter({ beforeSwitch, afterSwitch }, beofre, after) {
  expect(beforeSwitch).toBe(beofre);
  expect(afterSwitch).toBe(after);
}
