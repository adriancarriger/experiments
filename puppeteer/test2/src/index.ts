import { PocketService } from './pocket.service';
import { RulesService } from './rules.service';
import { AmazonPlugin } from './plugins/amazon.plugin';
import { NamePlugin } from './plugins/name.plugin';
import { CategoryPlugin } from './plugins/category.plugin';

(async () => {
  const pocket = new PocketService();
  const amazon = new AmazonPlugin();
  const name = new NamePlugin();
  const cateogory = new CategoryPlugin();
  await amazon.loadAmazonOrders();

  const rules = new RulesService([name, amazon, cateogory]);
  console.log('Starting update 🤖');
  await pocket.setupBrowser();
  await pocket.login();
  const transactions = await pocket.getTransactions();
  const updates = await rules.apply(transactions);

  await pocket.sendUpdates(updates);
  console.log('Update complete 🙂');
})().catch(console.error);
