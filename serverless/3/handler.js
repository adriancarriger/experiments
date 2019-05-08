const AWS = require('aws-sdk');
const archiver = require('archiver');
const { PassThrough } = require('stream');

const config = {
  maxParallelDownloads: 2,
  maxFiles: 4
};

const s3 = new AWS.S3();

module.exports.streamFilesToZip = async ({ directory }) => {
  const { stream: uploadStream, s3Upload } = uploadFromStream(s3, directory);
  const files = (await listFiles(`${directory}/files`)).slice(0, config.maxFiles);
  const archive = archiver('zip');

  archive.pipe(uploadStream);

  const addStreams = async (fullPath, files) => {
    const pathSections = fullPath.split('/');
    const fileName = pathSections[pathSections.length - 1];

    archive.append(await getFile(fullPath), {
      name: fileName
    });

    const newFile = files.pop();
    if (newFile) {
      await addStreams(newFile, files);
    }
  };

  await Promise.all(
    [...Array(config.maxParallelDownloads).keys()].map(() => addStreams(files.pop(), files))
  );

  archive.finalize();

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
  const files = await s3
    .listObjectsV2({
      Bucket: process.env.BUCKET,
      Prefix: directory
    })
    .promise();

  return files.Contents.map(content => content.Key);
}

async function getFile(fullPath) {
  const s3Object = await s3
    .getObject({
      Bucket: process.env.BUCKET,
      Key: fullPath
    })
    .promise();

  return s3Object.Body.toString();
}
