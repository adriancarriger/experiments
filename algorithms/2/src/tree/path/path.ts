export function getPath(network: Network, startNode: string, endNode: string): string[] {
  const nodes = [startNode];
  const breadcrumbs = {};

  while (nodes.length) {
    const current = nodes.shift();

    if (current === endNode) {
      break;
    }

    if (!network[current]) {
      continue;
    }

    network[current].forEach(neighbor => {
      if (!breadcrumbs[neighbor]) {
        breadcrumbs[neighbor] = current;
        nodes.push(neighbor);
      }
    });
  }

  let breadcrumb = endNode;
  const path = [endNode];
  while (breadcrumb !== startNode) {
    breadcrumb = breadcrumbs[breadcrumb];
    path.push(breadcrumb);
  }

  return path.reverse();
}

export interface Network {
  [key: string]: string[];
}
