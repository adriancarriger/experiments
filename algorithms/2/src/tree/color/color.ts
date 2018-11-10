import GraphNode from './graph-node';

export default (graph: GraphNode[]) => {
  const colors = new Colors();

  graph.forEach(node => {
    const illegalColors = new Set(node.color);
    [...node.neighbors].forEach(neighbor => illegalColors.add(neighbor.color));
    node.color = colors.next(illegalColors);
  });
};

class Colors {
  public colorCount = 0;
  private colors: string[] = [];
  private colorPointer = 0;

  public next(illegalColors?) {
    for (let i = 0; i < this.colors.length; i++) {
      this.colorPointer++;
      if (this.colorPointer > this.colors.length) {
        this.colorPointer = 0;
      }
      if (![...illegalColors, undefined].includes(this.colors[this.colorPointer])) {
        return this.colors[this.colorPointer];
      }
    }

    this.addColor();

    return this.colors[this.colorPointer];
  }

  private addColor() {
    this.colorCount++;
    this.colors.push(`C-${this.colorCount}`);
    this.colorPointer = this.colors.length - 1;
  }
}
