const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const { errorHandler } = require("../../utils/responseHandler");
dotenv.config();

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Upload
exports.uploadCloud = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file);
    if (result) {
      // fs.unlinkSync(file);
      fs.unlink(file, function (err) {
        if (err) {
          console.log(err);
        }
      });
      return { url: result.url, public_id: result.public_id };
    }
  } catch (err) {
    console.log(err);
    throw errorHandler("failed to upload images", 500);
  }
};

exports.cloudUploadImages = (arr) => {
  return Promise.all(arr.map(async (item) => await this.uploadCloud(item)));
};
