import * as puppeteer from 'puppeteer';
import * as path from 'path';

import { ImageSearchService } from '../image-search/image-search.service';

const imagesBase = path.join(__dirname, '../../assets');

export class VisualNav {
  private page;
  private imageSearch: ImageSearchService;

  public async initPage(page) {
    this.page = page;
    this.imageSearch = new ImageSearchService();
  }

  public async click(imageName, x = 0, y = 0) {
    await this.updateCurrent();
    const location1 = await this.imageSearch.find(imageName);
    await this.page.mouse.click(location1.x + x, location1.y + y);
  }

  private async updateCurrent() {
    await this.page.screenshot({path: `${imagesBase}/current.png`});
    await this.page.screenshot({path: `${imagesBase}/status.png`});
    await this.timeout(1);
  }

  private timeout(seconds) {
    return new Promise(resolve => setTimeout(() => resolve(), seconds * 1000));
  }
}
