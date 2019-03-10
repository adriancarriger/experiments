import { addTag } from './mutation-functions';

export default class RulesEngine {
  constructor(private plugins = []) {}

  public async apply(rows) {
    const updates = [];
    rows.forEach(row => {
      const rowCopy = JSON.stringify(row);
      let needsUpdate = false;
      if (!row.tags) {
        row.tags = [];
      }

      this.plugins.forEach(plugin => {
        if (plugin.needsUpdate(row)) {
          needsUpdate = true;
        }
      });

      if (needsUpdate && rowCopy !== JSON.stringify(row)) {
        addTag(row, 'λBot');
        updates.push(row);
      }
    });

    return updates;
  }
}
