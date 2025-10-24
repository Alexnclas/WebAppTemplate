const express = require("express");
const mediaController = require("../controllers/mediaController")
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')

// Protecting all routes
router.use(authMiddleware);
// Protecting a single route
// router.get("/", mediaController.getAllMedias);

// GET
router.get("/", mediaController.getAllMedias);
router.get("/:id", mediaController.getMediaById);
router.get("/:id/presigned-url", mediaController.getMediaFilePresignedUrl);

// POST
router.post("/", mediaController.postMedia);

// DELETE
 
// PUT

module.exports = router;
