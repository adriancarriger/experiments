const AWS = require('aws-sdk');
const s3Zip = require('s3-zip');
const { PassThrough } = require('stream');

const s3 = new AWS.S3();

module.exports.streamFilesToZip = async ({ directory }) => {
  const { stream: uploadStream, s3Upload } = uploadFromStream(s3, directory);

  s3Zip
    .archive({ s3, bucket: process.env.BUCKET }, '', await listFiles(`${directory}/files`))
    .pipe(uploadStream);

  return s3Upload.promise();
};

function uploadFromStream(s3, directory) {
  const stream = new PassThrough();

  return {
    stream,
    s3Upload: s3.upload({
      Bucket: process.env.BUCKET,
      Key: `${directory}/output.zip`,
      Body: stream
    })
  };
}

async function listFiles(directory) {
  const files = await s3.listObjectsV2({ Bucket: process.env.BUCKET, Prefix: directory }).promise();

  return files.Contents.map(content => content.Key);
}
