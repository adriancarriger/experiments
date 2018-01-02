import { GoogleService } from './google/google.service';

const googleService = new GoogleService();

(async () => {
  await googleService.setupBrowser();
  await run();
})();

async function run() {
  await googleService.navigateHome();
}
