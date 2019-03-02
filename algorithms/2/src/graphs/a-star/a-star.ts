import { PriorityQueue } from './priority-queue';
import { Network, NetworkNode, Position } from './network';

interface Node extends NetworkNode {
  gScore: number; // actual cost to get here
  fScore: number; // estimated cost to the end
  previousId: string;
  id: string;
}

// Keep track of where we've been
interface Breadcrumbs {
  [index: string]: Node;
}

export default (network: Network, startIndex: number, endIndex: number) => {
  // Setup data structures
  const end = endIndex.toString();
  const nodes = new PriorityQueue();
  const breadcrumbs: Breadcrumbs = {};

  // Add first node
  addItem(0, startIndex, network[startIndex]);

  while (nodes.size) {
    const node: Node = nodes.dequeue();

    if (node.id === end) {
      return reconstructPath(breadcrumbs, node);
    }

    node.neighbors.forEach(neighborIndex => {
      const possibleGScore = node.gScore + distance(node.pos, network[neighborIndex].pos);

      if (!(neighborIndex in breadcrumbs) || possibleGScore < breadcrumbs[neighborIndex].gScore) {
        addItem(possibleGScore, neighborIndex, node);
      }
    });
  }

  function addItem(possibleGScore: number, neighborIndex: number, current) {
    breadcrumbs[neighborIndex] = {
      ...network[neighborIndex],
      gScore: possibleGScore,
      fScore: possibleGScore + distance(current.pos, network[neighborIndex].pos),
      previousId: current.id,
      id: neighborIndex.toString()
    };

    nodes.enqueue(breadcrumbs[neighborIndex].fScore, breadcrumbs[neighborIndex]);
  }
};

function distance(start: Position, end: Position) {
  return Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
}

function reconstructPath(breadcrumbs: Breadcrumbs, end: Node) {
  const path = [];
  let current: Node = end;

  while (current) {
    path.unshift(Number(current.id));
    current = breadcrumbs[current.previousId];
  }

  return path;
}
