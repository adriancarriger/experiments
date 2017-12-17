// Example images were taken from http://docs.opencv.org/2.4/doc/tutorials/imgproc/histograms/template_matching/template_matching.html

const cv = require('opencv');

cv.readImage('./Template_Matching_Original_Image.jpg', (err, image) => {
  if (err) return console.error('error loading image');

  const output = image.matchTemplate('./Template_Matching_Template_Image.jpg', 3);

  console.log(output);

  var matches = output[0].templateMatches(0.80, 1.0, 5, false);
  // var matches = output[0].templateMatches(0.80, 1.0, 5, true, 0, 0);

  console.log(matches);
});
