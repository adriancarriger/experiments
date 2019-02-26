import { PriorityQueue } from './priority-queue';
import { Network, NetworkNode } from './network';

interface Node extends NetworkNode {
  gScore: number;
  fScore: number;
  id: number;
}

export default (network: Network, startIndex: number, endIndex: number) => {
  // Setup data structures
  const nodes = new PriorityQueue();
  const breadcrumbs = {};

  // Enqueue first node
  const startNode: Node = { ...network[startIndex], gScore: 0, fScore: 0, id: startIndex };
  nodes.enqueue(0, startNode);

  while (nodes.size) {
    const node: Node = nodes.dequeue();

    node.neighbors.forEach(neighborIndex => {
      const neighbor = network[neighborIndex];

      if (!(neighborIndex in breadcrumbs)) {
      }
    });
  }
};

// TODO check this
function nextGScore(node, neighbor) {
  return node.g + (neighbor.x - node.x === 0 || neighbor.y - node.y === 0 ? 1 : Math.SQRT2);
}

function heuristic(x: number, y: number) {
  return Math.sqrt(x * x + y * y);
}
