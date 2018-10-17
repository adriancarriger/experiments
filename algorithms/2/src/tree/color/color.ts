import { GraphNode } from './graph-node';

export function applyLegalColoring(graph: GraphNode[]) {
  const colors = new Colors();
  graph[0].color = colors.nextColor();

  graph.forEach(current => {
    colors.colorsNeeded(current.neighbors.size + 1);

    current.neighbors.forEach(neighbor => {
      if (!neighbor.color) {
        for (let i = 0; i < colors.colorCount; i++) {
          const nextColor = colors.nextColor();
          if (current.color !== nextColor) {
            neighbor.color = nextColor;
            break;
          }
        }
      }
    });
  });
}

class Colors {
  public colorCount = 0;
  private colors: string[] = [];
  private colorPointer = 0;

  constructor() {
    this.colorsNeeded(1);
  }

  public nextColor() {
    this.colorPointer = this.colorPointer === this.colors.length - 1 ? 0 : this.colorPointer + 1;
    return this.colors[this.colorPointer];
  }

  public colorsNeeded(total: number) {
    if (total <= this.colorCount) {
      return;
    }

    const colorsToAdd = total - this.colorCount;
    for (let i = 0; i < colorsToAdd; i++) {
      this.addColor();
    }
  }

  private addColor() {
    this.colorCount++;
    this.colors.push(`C-${this.colorCount}`);
  }
}
