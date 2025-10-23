const express = require("express");
const mediaController = require("../controllers/mediaController")
const router = express.Router();

// GET
router.get("/", mediaController.getAllMedias);
router.get("/:id", mediaController.getMediaById);
router.get("/:id/presigned-url", mediaController.getMediaFilePresignedUrl);

// POST
router.post("/", mediaController.postMedia);

// DELETE

// PUT

module.exports = router;

// const express = require('express');
// const router = express.Router();
// const path = require('path');
// const mediaController = require('../controllers/mediaController');
// const aws = require('aws-sdk');
// const multerS3 = require('multer-s3');
// const multer = require('multer');

// // ⚡ Config AWS SDK pour MinIO local
// const s3 = new aws.S3({
//   endpoint: process.env.MINIO_ENDPOINT, 
//   accessKeyId: process.env.MINIO_ACCESS_KEY,
//   secretAccessKey: process.env.MINIO_SECRET_KEY,
//   s3ForcePathStyle: true,
//   signatureVersion: 'v4',
// });

// // Multer storage → upload direct dans MinIO
// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: 'media', // ton bucket
//     acl: 'public-read',
//     key: (req, file, cb) => {
//       const uniqueName = Date.now().toString() + '-' + file.originalname;
//       cb(null, uniqueName);
//     },
//   }),
// });

// // Routes CRUD + upload
// router.get('/', mediaController.getAllMedia);
// router.get('/:id', mediaController.getMediaById);
// router.get('/:id/file', mediaController.streamMedia);
// router.post('/', upload.single('file'), mediaController.createMedia); // 'file' correspond au nom du champ dans le formulaire
// router.put('/:id', mediaController.updateMedia);
// router.delete('/:id', mediaController.deleteMedia);


// module.exports = router;