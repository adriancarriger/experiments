export class Shape {
  constructor(public x, public y) {}

  public move(x, y) {
    this.x += x;
    this.y += y;
  }
}

export class Circle extends Shape {
  constructor(x, y, public r) {
    super(x, y);
  }

  public area() {
    return this.r * 2 * Math.PI;
  }
}
