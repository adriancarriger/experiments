import * as fs from 'fs';
import { promisify } from 'util';

import { MatchingService } from './matching.service';
import { PocketService } from './pocket/pocket.service';

// const pocket = new PocketService();
const matcher = new MatchingService();
(async () => {
  await matcher.saveUpdated();
  // await pocket.setupBrowser();
  // await pocket.login();
  // await pocket.transactions();
})().catch(console.error);
