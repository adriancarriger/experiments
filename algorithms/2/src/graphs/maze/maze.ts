export default (maze: number[][], startNode: Cordinate, endNode: Cordinate) => {
  const nodes = [startNode];
  const zeroNodes = [];
  const breadcrumbs = {};

  while (nodes.length) {
    const node = nodes.shift(); // 🐁
    const neighbors: Cordinate[] = getNeighbors(maze, node);

    for (let i = 0; i < neighbors.length; i++) {
      const { x, y } = neighbors[i];
      const key = `${x}, ${y}`;
      if (!breadcrumbs.hasOwnProperty(key)) {
        breadcrumbs[key] = (neighbors[i], node);

        if (maze[neighbors[i].y][neighbors[i].x] === 0) {
          zeroNodes.push(neighbors[i]);
        } else {
          nodes.push(neighbors[i]);
          if (neighbors[i].x === endNode.x && neighbors[i].y === endNode.y) {
            // 🧀
            nodes.length = 0;
            break;
          }
        }
      }
    }
  }

  const path = [getKey(endNode)];
  const startKey = getKey(startNode);

  while (path[0] !== startKey) {
    path.unshift(getKey(breadcrumbs[path[0]]));
  }

  const nodeToSwitch = findBestNodeToSwitch(maze, path, zeroNodes);
  const beforeSwitch = path.length - 1;

  return {
    switchNode: nodeToSwitch.node,
    steps: {
      beforeSwitch,
      afterSwitch: beforeSwitch - nodeToSwitch.stepsReduced
    }
  };
};

function findBestNodeToSwitch(maze, path, zeroNodes) {
  const valueMap = {};
  path.forEach((node, index) => {
    valueMap[node] = index;
  });

  const best = { node: undefined, stepsReduced: undefined };
  zeroNodes.forEach(zeroNode => {
    let maxValue;
    let minValue;
    getNeighbors(maze, zeroNode).forEach(neighbor => {
      if (maze[neighbor.y][neighbor.x] === 1) {
        const key = getKey(neighbor);
        if (valueMap[key] !== undefined) {
          maxValue = Math.max(maxValue, valueMap[key]) || valueMap[key];
          minValue = Math.min(minValue, valueMap[key]) || valueMap[key];
        }
      }
    });

    if (maxValue !== undefined && maxValue !== minValue) {
      const stepsReduced = maxValue - minValue - 2;
      if (best.stepsReduced === undefined || stepsReduced > best.stepsReduced) {
        best.stepsReduced = stepsReduced;
        best.node = zeroNode;
      }
    }
  });

  return best;
}

function getNeighbors(maze, node) {
  const defaultNeighbors: Cordinate[] = [];

  return [
    { x: 0, y: -1 }, // top
    { x: 1, y: -1 }, // top-right
    { x: 1, y: 0 }, // right
    { x: 1, y: 1 }, // bottom-right
    { x: 0, y: 1 }, // bottom
    { x: -1, y: 1 }, // bottom-left
    { x: 0, y: 1 }, // bottom
    { x: -1, y: 0 }, // left
    { x: -1, y: -1 } // top-left
  ].reduce((neighbors, offset) => {
    const neighbor = { x: node.x + offset.x, y: node.y + offset.y };
    if (maze[neighbor.y] && maze[neighbor.y][neighbor.x] !== undefined) {
      neighbors.push(neighbor);
    }

    return neighbors;
  }, defaultNeighbors);
}

function getKey(node) {
  return `${node.x}, ${node.y}`;
}

interface Cordinate {
  x: number;
  y: number;
}
