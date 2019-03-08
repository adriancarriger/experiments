import { MatchingService } from './matching.service';
import { PocketService } from './pocket.service';

const pocket = new PocketService();
const matcher = new MatchingService();

(async () => {
  console.log('Starting update 🤖');
  await pocket.setupBrowser();
  await pocket.login();
  const transactions = await pocket.getTransactions();
  const updates = await matcher.getUpdates(transactions);
  await pocket.sendUpdates(updates);
  console.log('Update complete 🙂');
})().catch(console.error);
