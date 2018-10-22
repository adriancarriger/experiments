export class TempTracker {
  private temperatures = [];
  private mean: number;
  private mode: number;
  private sum: number;
  private length = 0;
  private maxOccurances = 0;

  public insert(newTemp: number) {
    this.sum += newTemp;
    this.length++;
    this.mean = this.sum / this.length;
    this.temperatures[newTemp] = 1 + (this.temperatures[newTemp] || 0);
    this.mode = Math.max(...this.temperatures);

    if (this.temperatures[newTemp] > this.maxOccurances) {
      this.maxOccurances = this.temperatures[newTemp];
    }
  }

  public getMax() {
    return this.temperatures[this.temperatures.length - 1];
  }

  public getMin() {
    return this.temperatures[0];
  }

  public getMean() {
    return this.mean;
  }

  public getMode() {
    return this.mode;
  }
}
