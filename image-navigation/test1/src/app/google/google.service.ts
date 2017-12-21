import * as puppeteer from 'puppeteer';
import * as path from 'path';

import { VisualNav } from '../visual-nav/visual-nav';

const imagesBase = path.join(__dirname, '../../assets');

export class GoogleService {
  private page: puppeteer.Page;
  private visualNav: VisualNav;

  public async navigateHome() {
    await this.page.goto('https://google.com');

    this.visualNav.click('search-box.png', 50, 20);
    await this.page.keyboard.type('DocuTAP');
    await this.page.keyboard.press('Enter');
    await this.timeout(3);

    this.visualNav.click('images-button.png', 30, 20);
    await this.timeout(3);

    // Status
    await this.page.screenshot({path: `${imagesBase}/status.png`});
  }

  public async setupBrowser() {
    const browser: puppeteer.Browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      ignoreHTTPSErrors: Number(process.env.NODE_TLS_REJECT_UNAUTHORIZED) === 0
    });
    this.page = await browser.newPage();
    this.page.setViewport({width: 1000, height: 1200});

    this.visualNav = new VisualNav();
    this.visualNav.initPage(this.page);

  }

  private timeout(seconds) {
    return new Promise(resolve => setTimeout(() => resolve(), seconds * 1000));
  }
}