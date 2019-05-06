const AWS = require('aws-sdk');

const s3 = new AWS.S3();

(async () => {
  await createObjects('test-1', 300);
})();

/**
 * Puts about a gigabyte of text files (6.9mb each) in S3
 */
async function createObjects(directory, numberOfFiles) {
  const fileContents = [...Array(1000000).keys()].join('\n');
  const files = [...Array(numberOfFiles + 1).keys()];

  const uploadFile = async (fileKey, files) => {
    await s3
      .putObject({
        Bucket: process.env.BUCKET,
        Key: `${directory}/files/example-object-${fileKey}.txt`,
        Body: fileContents
      })
      .promise();

    const nextFile = files.pop();
    if (nextFile) {
      await uploadFile(nextFile, files);
    }
  };

  await uploadFile(files.pop(), files);
}
