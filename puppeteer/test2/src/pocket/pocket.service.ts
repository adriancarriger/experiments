import * as path from 'path';
import * as puppeteer from 'puppeteer';

const imagesBase = path.join(__dirname, '../../logs');

export class PocketService {
  private page: puppeteer.Page;

  public async login() {
    await this.page.goto('https://my.pocketsmith.com/login');
    await this.page.keyboard.type('adriancarriger');
    await this.page.keyboard.press('Tab');
    await this.page.keyboard.type(process.env.POCKET_TOKEN);
    await this.page.keyboard.press('Enter');
    await this.page.waitForNavigation();
  }

  public async transactions() {
    await this.page.goto('https://my.pocketsmith.com/transactions/search/811275', {
      waitUntil: 'networkidle0'
    });

    // Status
    await this.page.screenshot({ path: `${imagesBase}/status.png` });
  }

  public async setupBrowser() {
    const browser: puppeteer.Browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      ignoreHTTPSErrors: Number(process.env.NODE_TLS_REJECT_UNAUTHORIZED) === 0
    });
    this.page = await browser.newPage();
    this.page.setViewport({ width: 1000, height: 1200 });
  }
}
