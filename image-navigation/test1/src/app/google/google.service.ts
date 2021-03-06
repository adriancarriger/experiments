import * as path from 'path';
import * as puppeteer from 'puppeteer';

import { delay } from '../utilities';
import { VisualNav } from '../visual-nav/visual-nav';

const imagesBase = path.join(__dirname, '../../assets');

export class GoogleService {
  private page: puppeteer.Page;
  private visualNav: VisualNav;

  public async navigateHome() {
    await this.page.goto('https://google.com');

    await this.visualNav.click('search-box.png', 50, 20);
    await this.page.keyboard.type('GitHub');
    await this.page.keyboard.press('Enter');
    await delay(3);

    this.visualNav.click('images-button.png', 30, 20);
    await delay(3);

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

    this.visualNav = new VisualNav();
    this.visualNav.initPage(this.page);
  }
}
