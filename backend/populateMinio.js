const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const Media = require("./src/models/Media");
const aws = require("aws-sdk");
const readSecret = require("./src/utils/readSecrets");

const bucketName = "media";
const testFileDirectory = "testAssets";
const testSeeds = [
  { filename: 'ImgTestFile.png', title: 'Image de test', description: 'Un fichier image', tags: ['demo','image']},
  { filename: 'videoTestFile.mp4', title: 'Vidéo de test', description: 'Une vidéo exemple', tags: ['demo','video'] },
  { filename: 'audioTest.wav', title: 'Audio de test', description: 'Un fichier audio', tags: ['demo','audio'] },
];

const s3 = new aws.S3({
  endpoint: process.env.MINIO_ENDPOINT,
  accessKeyId: readSecret(process.env.MINIO_ACCESS_KEY_FILE, process.env.MINIO_ACCESS_KEY),
  secretAccessKey: readSecret(process.env.MINIO_SECRET_KEY_FILE, process.env.MINIO_SECRET_KEY),
  s3ForcePathStyle: true,
}) 

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error(err));

async function uploadAndSave(testSeed) {
  const filename = testSeed.filename;
  const filePath = path.join(__dirname, testFileDirectory, filename);
  const fileStream = fs.createReadStream(filePath);

  const contentType = filename.endsWith(".mp4") ? "video/mp4" :
                    filename.endsWith(".mp3") ? "audio/mpeg" :
                    filename.endsWith(".wav") ? "audio/wav" :
                    filename.endsWith(".jpg") || filename.endsWith(".jpeg") ? "image/jpeg" :
                    filename.endsWith(".png") ? "image/png" :
                    filename.endsWith(".gif") ? "image/gif" :
                    "application/octet-stream";

  const s3Params = {
    Bucket: bucketName,
    Key: Date.now() + '-' + testSeed.filename,
    Body: fileStream,
    ACL: 'public-read',
    ContentType: contentType
  };

  try {
    const data = await s3.upload(s3Params).promise();
    console.log('Uploaded test file to storage:', data.Location);

    const media = await Media.create({
      title: testSeed.title,
      description: testSeed.description,
      tags: testSeed.tags,
      // url: data.Location,
      storageKey: s3Params.Key,
      uploadDate: new Date(),
    });
    console.log('MongoDB entry created:', media);
  } catch (err) {
    console.error(err);
  }
}

async function ensureBucketExists(name) {
  try {
    await s3.headBucket({ Bucket: name }).promise();
    console.log(`Bucket "${name}" already exists!`);
  } 
  catch(err) {
    if (err.statusCode === 404) {
      console.log(`Bucket "${name}" does not exists, creating it`);
      await s3.createBucket({ Bucket: bucketName }).promise();
      console.log(`Bucket "${bucketName}" created`);
    } else {
      throw err;
    }
  }
}

async function main() {
  console.log("Populating media database and storage for test purposes")
  await ensureBucketExists(bucketName);

  for (const seed of testSeeds) {
      await uploadAndSave(seed);
  }

  console.log('All files uploaded!');
  mongoose.disconnect();
}

main();

