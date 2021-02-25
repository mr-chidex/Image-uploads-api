const express = require("express");
const router = express.Router();

const imageUploader = require("../middleware/multer");
const { addImage, deleteImage } = require("../controllers/image");

router.route("/api/images").post(imageUploader.single("image"), addImage);
router
  .route("/api/images/:imageId")
  .delete(imageUploader.single("image"), deleteImage);

module.exports = router;
