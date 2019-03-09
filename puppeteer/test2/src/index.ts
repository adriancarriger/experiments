import PocketService from './pocket.service';
import RulesEngine from './rules.engine';
import getPlugins from './plugins';

(async () => {
  const pocket = new PocketService();
  const rules = new RulesEngine(await getPlugins());

  console.log('Starting update 🤖');

  await pocket.setupBrowser();
  await pocket.login();
  const transactions = await pocket.getTransactions();
  const updates = await rules.apply(transactions);

  await pocket.sendUpdates(updates);

  console.log('Update complete 🙂');
})().catch(console.error);
