const { Storage } = require("@google-cloud/storage");

const storage = new Storage();
const bucketName = process.env.GCS_BUCKET_NAME;

async function uploadScanImage(filepath, data) {
  await storage.bucket(bucketName).file(filepath).save(data);
  return `https://storage.googleapis.com/${bucketName}/${filepath}`;
}

module.exports = { uploadScanImage };