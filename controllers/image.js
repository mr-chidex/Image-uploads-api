const Image = require("../models/image");
const cloudinary = require("../handler/cloudinary");

//@desc  Upload image to cloud
//@Route    POST/api/images
//@Access   Public (Note: In your projects this should be private)
exports.addImage = async (req, res, next) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: "please select an image" });
    console.log(req.file);

    const cloudImage = await cloudinary.v2.uploader.upload(req.file);
    console.log("cloud_image", cloudImage);
  } catch (error) {
    next(error);
  }
};

//@desc  Delete uploaded image from cloud
//@Route    DELETE/api/images
//@Access   Public (Note: In your projects this should be private)
exports.deleteImage = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
