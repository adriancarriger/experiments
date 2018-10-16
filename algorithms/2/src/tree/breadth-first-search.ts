import { Queue } from './queue';

export function bfs(graph, startNode: string, endNode: string) {
  const nodesToVisit = new Queue();
  nodesToVisit.enqueue(startNode);

  // keep track of what nodes we've already seen
  // so we don't process them twice
  const nodesAlreadySeen = new Set([startNode]);

  while (nodesToVisit.size > 0) {
    const currentNode = nodesToVisit.dequeue();

    // stop when we reach the end node
    if (currentNode === endNode) {
      // found it!
      break;
    }

    graph[currentNode].forEach(neighbor => {
      if (!nodesAlreadySeen.has(neighbor)) {
        nodesAlreadySeen.add(neighbor);
        nodesToVisit.enqueue(neighbor);
      }
    });
  }
}

export interface Graph {
  [key: string]: string[];
}
