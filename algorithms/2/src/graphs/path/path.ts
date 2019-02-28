export default (network: Network, startNode, endNode) => {
  let nodes: string[] = [startNode];
  const breadcrumbs = {};

  while (nodes.length) {
    const node = nodes.shift();

    (network[node] || []).forEach(neighbor => {
      if (!(neighbor in breadcrumbs)) {
        breadcrumbs[neighbor] = node;

        if (neighbor === endNode) {
          nodes = [];
          return;
        }

        nodes.push(neighbor);
      }
    });
  }

  const path: string[] = [endNode];
  while (path[0] !== startNode) {
    path.unshift(breadcrumbs[path[0]]);
  }

  return path;
};

export interface Network {
  [key: string]: string[];
}
