import * as cv from 'opencv';
import * as path from 'path';

const imagesBase = path.join(__dirname, '../../assets');

export class ImageSearchService {
  public async find(fileName: string) {
    const image: any = await this.myreadImage(`${imagesBase}/current.png`);
    const output = image.matchTemplate(`${imagesBase}/${fileName}`, 3);
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
