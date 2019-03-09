import rules from '../rules/category.rules';

export class CategoryPlugin {
  public name = 'Category';

  public needsUpdate(row) {
    let foundMatch = false;
    rules.forEach(rule => {
      if (rule.merchants.includes(row.payee)) {
        row.category_title = rule.newCategory;
        foundMatch = true;

        return;
      }
    });

    return foundMatch;
  }
}
