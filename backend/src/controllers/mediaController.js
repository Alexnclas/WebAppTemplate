const Media = require("../models/Media");
const aws = require("aws-sdk");
const readSecret = require("../utils/readSecrets");

const bucketName = "media";

const s3 = new aws.S3({
  endpoint: process.env.MINIO_ENDPOINT,
  accessKeyId: readSecret("minio_access_key", process.env.MINIO_ACCESS_KEY),
  secretAccessKey: readSecret("minio_secret_key", process.env.MINIO_SECRET_KEY),
  s3ForcePathStyle: true,
}) 

//////////
// GETs //
//////////

// GET /medias
exports.getAllMedias = async (req, res) => {
  console.log("GET /medias called!")
  try {
    const medias = await Media.find()
    res.json(medias);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error'});
  }
};

// GET /medias/:id

exports.getMediaById = async (req, res) => {
  console.log("GET /medias/:id called!")
  try {
    const media = await Media.findById(req.params.id)
    if (!media) return res.status(404).json({ message: 'Media not found'})
    res.json(media);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error'});
  }
}

// GET /medias/:id/presigned
exports.getMediaFilePresignedUrl = async (req, res) => {
  console.log("GET /medias/:id/presigned called!")
  try {
    // Check user
    const media = await Media.findById(req.params.id)
    if (!media) return res.status(404).json({ message: 'Media not found'})
    // const s3ObjectHeader = await s3.headObject({ Bucket: bucketName, Key: media.storageKey}).promise();
    
    const urlExpiration = parseInt(process.env.MEDIA_PRESIGNED_URL_EXPIRATION, 10) || 60;

    let url = s3.getSignedUrl('getObject', {
        Bucket: bucketName,
        Key: media.storageKey,
        Expires: urlExpiration,
      });
    
    url = url.replace("http://minio:9000", "http://localhost:9000");
    res.json({ url });
  }
  catch (err) {
    console.error(err);
    res.status(500).json({message: "Server error when generating presigned URL"})
  }
}

///////////
// POSTs //
///////////

// POST /medias
exports.postMedia = async (req, res) => {
  console.log("POST /medias called!")
  try {
    const { title, description, tags, contentType, filename } = req.body;
    const key = `${Date.now()}-${filename}`;

    let url = s3.getSignedUrl('putObject', {
      Bucket: bucketName,
      Key: key,
      Expires: 60, // URL valid for 60 seconds
      ContentType: contentType 
    });

    const media = await Media.create({
      title,
      description,
      tags: tags || [],
      filename: filename, 
      storageKey: key,
      uploadDate: new Date()
    });
    console.log('Database entry created:', media);
    url = url.replace("http://minio:9000", "http://localhost:9000");

    res.json({ uploadUrl: url, mediaId: media._id });
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to generate upload URL'});
  }
};
