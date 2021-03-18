const Image = require("../models/image");
const cloudinary = require("../handler/cloudinary");

//@desc  Upload image to cloud
//@Route    POST/api/images
//@Access   Public (Note: In your projects this should be private)
exports.addImage = async (req, res, next) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: "please select an image" });

    //You can choose to specify the saving folder
    const cloudImage = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: "image/cloud_image",
    });

    if (!cloudImage)
      return res.status(400).json({ message: "error uploading image" });

    //Note: public_id was splitted because a folder name was specified image/cloud_name/
    const image = await new Image({
      image_name: req.file.originalname,
      image_url: cloudImage.secure_url,
      image_id: cloudImage.public_id.split("/")[2],
    });

    await image.save();

    if (!image) return res.status(400).json({ message: "error saving image" });

    res.status(201).json(image);
  } catch (error) {
    next(error);
  }
};

//@desc  Delete uploaded image from cloud
//@Route    DELETE/api/images
//@Access   Public (Note: In your projects this should be private)
exports.deleteImage = async (req, res, next) => {
  try {
    //Note: imageId is the clodinary Id(image_id) of the image
    const imageId = req.params.imageId;

    if (!imageId)
      return res.status(400).json({ message: "no image Id specified" });

    //Note:
    const { result } = await cloudinary.v2.uploader.destroy(
      `image/cloud_image/${imageId}`
    );

    if (result !== "ok")
      return res
        .status(400)
        .json({ message: "image with such id does not exist" });

    await Image.deleteOne({
      image_id: imageId,
    });

    return res.status(200).json({ message: "image successfully deleted" });
  } catch (error) {
    next(error);
  }
};
