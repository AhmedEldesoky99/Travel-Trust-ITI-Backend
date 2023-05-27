const { uploadCloud } = require("../../middlewares/cloudinary/cloudinary");
const {
  sharpHandler,
  uploadSingleImage,
} = require("../../middlewares/upload-img/upload-img");
const { userModel } = require("../../models/index");
const { errorHandler, successHandler } = require("../../utils/responseHandler");

exports.updateUser = async (req, res, next) => {
  try {
    const getUser = await userModel.findById(req.userID);

    if (getUser.id !== req.userID) {
      throw errorHandler("unauthorized", 401);
    }

    await Promise.all(
      req.files?.map(async ({ file, name }) => {
        const uploadedFile = await uploadCloud(file);
        req.body[name] = [{ ...uploadedFile }];
      })
    );

    const response = await userModel
      .findByIdAndUpdate(req.userID, { ...req.body })
      .populate("city");

    successHandler(res, response, "user updated successfully");
  } catch (err) {
    next(err);
  }
};
