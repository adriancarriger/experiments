export class RulesService {
  constructor(private plugins = []) {}

  public async apply(rows) {
    const updates = [];
    rows.forEach(row => {
      let needsUpdate = false;
      row.tags = [];
      this.plugins.forEach(plugin => {
        if (plugin.needsUpdate(row)) {
          needsUpdate = true;
        }
      });

      if (needsUpdate) {
        row.tags.push('Bot');
        updates.push(row);
      }
    });

    return updates;
  }
}
