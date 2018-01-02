import * as cv from 'opencv';
import * as path from 'path';

const imagesBase = path.join(__dirname, '../../assets');

export class ImageSearchService {
  public async find(template: string) {
    const image: any = await this.readImage(`${imagesBase}/current.png`);
    const output = image.matchTemplate(`${imagesBase}/${template}`, 3);
    return output.templateMatches(0.80, 1.0, 3, false)[0];
  }

  private async readImage(directory: string) {
    return new Promise((resolve) => cv.readImage(directory, (err, image) => resolve(image)));
  }
}
