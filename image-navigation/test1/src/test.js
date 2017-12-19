// Example images were taken from http://docs.opencv.org/2.4/doc/tutorials/imgproc/histograms/template_matching/template_matching.html

// Using => {"opencv": "^6.0.0"}

const cv = require('opencv');

myreadImage('./Template_Matching_Original_Image.jpg').then((image) => {
  const output = image.matchTemplate('./Template_Matching_Template_Image.jpg', 3);
  const test = output[0].minMaxLoc();

  printMethods(test);

  // printMethods(output[0]);

  // var matches = output[0].templateMatches(0.80, 1.0, 5, false);
  // var matches = output[0].templateMatches(0.80, 1.0, 5, true, 0, 0);
});

async function myreadImage(path) {
  return new Promise((resolve, reject) => {
    cv.readImage(path, (err, image) => {
      if (err) { reject('error loading image'); }
      resolve(image);
    });
  });
}

function printMethods(obj) {
  const methods = getMethods(obj);
  console.log(methods);
  console.log(obj);
}

function getMethods(obj) {
  var result = [];
  for (var id in obj) {
    try {
      if (typeof(obj[id]) == "function") {
        result.push(id + ": " + obj[id].toString());
      }
    } catch (err) {
      result.push(id + ": inaccessible");
    }
  }
  return result;
}