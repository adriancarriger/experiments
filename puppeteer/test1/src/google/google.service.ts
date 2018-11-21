import * as path from 'path';
import * as puppeteer from 'puppeteer';

const imagesBase = path.join(__dirname, '../../logs');

export class GoogleService {
  private page: puppeteer.Page;

  public async navigateHome() {
    await this.page.goto('https://google.com');

    await this.page.keyboard.type('GitHub');
    await this.page.keyboard.press('Enter');

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
