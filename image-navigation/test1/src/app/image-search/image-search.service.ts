import * as cv from 'opencv';
import * as path from 'path';

const imagesBase = path.join(__dirname, '../temp');

export class ImageSearchService {
  public async find(src: string) {
    console.log(`finding ${imagesBase}`);

    const image: any = await this.myreadImage(`${imagesBase}/original.jpg`);
    const output = image.matchTemplate(`${imagesBase}/template7.png`, 3);
    const matches = output.templateMatches(0.80, 1.0, 3, false);

    return matches[0];
  }

  private async myreadImage(path) {
    return new Promise((resolve, reject) => {
      cv.readImage(path, (err, image) => {
        if (err) { reject('error loading image'); }
        resolve(image);
      });
    });
  }
}
