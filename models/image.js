const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const imageSchema = new Schema(
  {
    image_name: {
      type: String,
      required: true,
    },
    image_url: {
      type: String,
      required: true,
    },
    image_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Image", imageSchema);
