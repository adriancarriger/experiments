// Example images were taken from http://docs.opencv.org/2.4/doc/tutorials/imgproc/histograms/template_matching/template_matching.html

// Using => {"opencv": "^5.0.0"}

var cv = require('opencv');

myreadImage('.images/original.jpg').then((image) => {
  var output = image.matchTemplate('.images/template8-2.jpg', 3);

  var matches = output.templateMatches(0.80, 1.0, 1, false);

  console.log(matches);
});

async function myreadImage(path) {
  return new Promise((resolve, reject) => {
    cv.readImage(path, (err, image) => {
      if (err) { reject('error loading image'); }
      resolve(image);
    });
  });
}
