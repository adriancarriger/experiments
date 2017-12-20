import * as cv from 'opencv';
import * as path from 'path';

const imagesBase = path.join(__dirname, './src/assets');

(async () => {
  const image: any = await myreadImage(`${imagesBase}/original.jpg`);
  const output = image.matchTemplate(`${imagesBase}/template8-2.jpg`, 3);
  const matches = output.templateMatches(0.80, 1.0, 1, false);

  console.log(matches[0]);
})();

async function myreadImage(path) {
  return new Promise((resolve, reject) => {
    cv.readImage(path, (err, image) => {
      if (err) { reject('error loading image'); }
      resolve(image);
    });
  });
}
