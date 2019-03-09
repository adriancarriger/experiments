import { SimplePlugin } from '../simple.plugin';

export class LabelPlugin extends SimplePlugin {
  public name = 'Label';

  constructor() {
    super();
    this.prepareRules();
  }

  public updateRow(row, newValue) {
    row.tags.push(newValue);
  }
}
