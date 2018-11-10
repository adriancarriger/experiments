import applyLegalColoring from './color';
import GraphNode from './graph-node';

describe('...', () => {
  it('...', () => {
    const graph = createSimpleGraph();
    const { legal, maximumDegree } = isColoringLegal(graph);
    expect(legal).toBe(false);
    expect(maximumDegree).toBe(2);
  });

  it('...', () => {
    const graph = createSimpleGraph();
    applyLegalColoring(graph);
    const { legal, maximumDegree } = isColoringLegal(graph);
    expect(legal).toBe(true);
    expect(maximumDegree).toBe(2);
  });

  it('Legally colors a square graph', () => {
    const graph = createNodes(['a', 'b', 'c', 'd']);
    connectNodesCircle(graph);

    applyLegalColoring(graph);
    const { legal, maximumDegree } = isColoringLegal(graph);
    expect(legal).toBe(true);
    expect(maximumDegree).toBe(2);
  });

  it('...', () => {
    const graph = createNodes(['a', 'b', 'c', 'd', 'e']);
    connectNodesCircle(graph);
    connnectNodes([graph[0], graph[1], graph[4]]);

    applyLegalColoring(graph);
    const { legal, maximumDegree } = isColoringLegal(graph);
    expect(legal).toBe(true);
    expect(maximumDegree).toBe(3);
  });

  it('...', () => {
    const graph = createNodes(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l']);
    const [a, b, c, d, e, f, g, h, i, j, k, l] = graph;
    connectNodesCircle([a, b, c, d, e, f, g]);
    connnectNodes([h, a, g]);
    connnectNodes([h, a, g]);
    connnectNodes([j, b, c]);
    connnectNodes([k, e, f]); // bottom triangle

    connnectNodes([i, h]);
    connnectNodes([i, j]);
    connnectNodes([i, l]);

    connnectNodes([l, d]);
    connnectNodes([k, l]);

    applyLegalColoring(graph);
    const { legal, maximumDegree } = isColoringLegal(graph);
    expect(legal).toBe(true);
    expect(maximumDegree).toBe(3);
  });
});

function createSimpleGraph() {
  const nodes = createNodes(['a', 'b', 'c']);
  connnectNodes(nodes);

  return nodes;
}

function createNodes(labels: string[]) {
  return labels.map(label => new GraphNode(label));
}

function printGrpah(graph: GraphNode[], neighborText = 'label') {
  console.log(
    graph.map(node => ({
      label: node.label,
      color: node.color,
      neighbors: [...node.neighbors].map(neighbor => neighbor[neighborText])
    }))
  );
}

function connnectNodes(nodes: GraphNode[]) {
  nodes.forEach((nodeA, index) => {
    nodes.slice(index + 1, nodes.length).forEach(nodeX => {
      nodeA.neighbors.add(nodeX);
      nodeX.neighbors.add(nodeA);
    });
  });
}

function connectNodesCircle(nodes: GraphNode[]) {
  nodes.forEach((node, index) => {
    const nextNode = nodes[index + 1];
    if (nextNode) {
      connnectNodes([node, nextNode]);
    }
  });
  connnectNodes([nodes[nodes.length - 1], nodes[0]]);
}

function isColoringLegal(graph: GraphNode[]) {
  const nodes = [...graph];
  const seen: string[] = [];
  const result = { legal: true, maximumDegree: 0 };

  while (nodes.length) {
    const current = nodes.pop();

    if (current.neighbors.size > result.maximumDegree) {
      result.maximumDegree = current.neighbors.size;
    }

    if (!areNodesLegal([current, ...current.neighbors])) {
      result.legal = false;
      return result;
    }

    current.neighbors.forEach(neighbor => {
      if (!seen.includes(neighbor.label)) {
        nodes.push(neighbor);
        seen.push(neighbor.label);
      }
    });
  }

  return result;
}

function areNodesLegal(nodes: GraphNode[]) {
  return nodes.reduce(
    (previous, current) => {
      if (current.color === undefined || previous.colors.includes(current.color)) {
        previous.legal = false;
      }
      return previous;
    },
    { colors: [], legal: true }
  ).legal;
}
