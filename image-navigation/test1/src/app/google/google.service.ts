import * as puppeteer from 'puppeteer';
import * as path from 'path';

import { ImageSearchService } from '../image-search/image-search.service';

// const imageBase = 'src/app/tempp';
const imagesBase = path.join(__dirname, '../temp');

export class GoogleService {
  private page: puppeteer.Page;
  private imageSearch: ImageSearchService;

  public async navigateHome() {
    // await this.page.goto('https://google.com');
    // await this.page.screenshot({path: `${imageBase}/original.jpg`});

    const location = await this.imageSearch.find(`${imagesBase}/template2.jpg`);

    console.log(location);
  }

  public async setupBrowser() {
    const browser: puppeteer.Browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      ignoreHTTPSErrors: Number(process.env.NODE_TLS_REJECT_UNAUTHORIZED) === 0
    });
    this.page = await browser.newPage();
    this.page.setViewport({width: 1000, height: 1200});

    this.imageSearch = new ImageSearchService();
  }
}