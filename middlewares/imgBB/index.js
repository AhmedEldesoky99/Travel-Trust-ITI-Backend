const fs = require("fs");
const imgbbUploader = require("imgbb-uploader");
const dotenv = require("dotenv");
const { errorHandler } = require("../../utils/responseHandler");
dotenv.config();

exports.uploadCloudBB = async (file) => {
  console.log("uploading img to imgbb");
  try {
    const result = await imgbbUploader(process.env.IMGBB_KEY, file);
    if (result) {
      fs.unlink(file, function (err) {
        if (err) {
          console.log(err);
        }
      });
      return { url: result.url, public_id: result.id };
    }
  } catch (err) {
    console.log(err);
    throw errorHandler("failed to upload images", 500);
  }
};

exports.cloudUploadImages = (arr) => {
  return Promise.all(arr.map(async (item) => await this.uploadCloud(item)));
};
