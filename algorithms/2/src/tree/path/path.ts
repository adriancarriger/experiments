export function getPath(graph, startNode, endNode) {
  const nodesToVisit = [startNode];
  const neighborsSeen = {};

  while (nodesToVisit.length) {
    const currentNode = nodesToVisit.shift();

    if (currentNode === endNode) {
      break;
    }

    if (graph[currentNode] === undefined) {
      continue;
    }

    graph[currentNode].forEach(neighbor => {
      if (!neighborsSeen.hasOwnProperty(neighbor)) {
        neighborsSeen[neighbor] = currentNode;
        nodesToVisit.push(neighbor);
      }
    });
  }

  return tracePath(neighborsSeen, startNode, endNode);
}

function tracePath(neighborsSeen, startNode, current) {
  const path = [current];
  while (current !== startNode) {
    current = neighborsSeen[current];
    path.push(current);
  }

  return path.reverse();
}
