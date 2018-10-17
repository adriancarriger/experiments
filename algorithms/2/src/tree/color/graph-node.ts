export class GraphNode {
  public neighbors: Set<GraphNode> = new Set();
  public color: string;

  constructor(public label: string) {}
}
