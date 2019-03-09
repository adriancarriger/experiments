import rules from '../rules/name.rules';

export class NamePlugin {
  public name = 'Name';

  public needsUpdate(row) {
    const merchant = row.payee.toLowerCase();
    let foundMatch = false;
    rules.forEach(rule => {
      if (foundMatch) {
        return;
      }
      rule.keywords.forEach(keyword => {
        if (merchant.includes(keyword)) {
          row.payee = rule.newName;
          foundMatch = true;

          return;
        }
      });
    });

    return foundMatch;
  }
}
