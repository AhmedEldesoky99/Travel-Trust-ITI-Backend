const { isArray } = require("util");
const { uploadCloud } = require("../../middlewares/cloudinary/cloudinary");
const {
  sharpHandler,
  uploadSingleImage,
} = require("../../middlewares/upload-img/upload-img");
const { userModel, CitiesModal: City } = require("../../models/index");
const { errorHandler, successHandler } = require("../../utils/responseHandler");

exports.updateUser = async (req, res, next) => {
  try {
    const getUser = await userModel.findById(req.userID);

    if (getUser.id !== req.userID) {
      throw errorHandler("unauthorized", 401);
    }
    let checkUniqueName = await userModel.find({
      username: req.body?.username,
    });
    checkUniqueName = checkUniqueName.filter(
      (item) => +item.id !== +req.userID
    );

    if (checkUniqueName.length !== 0) {
      throw errorHandler("username is not available", 400);
    }

    if (req.files.length > 0)
      await Promise.all(
        req.files?.map(async ({ file, name }) => {
          const uploadedFile = await uploadCloud(file);
          req.body[name] = [{ ...uploadedFile }];
        })
      );

    if (isArray(req.body?.governorate_expertise))
      await Promise.all(
        req.body.governorate_expertise.map(async (city, i) => {
          const result = await City.findById(city);
          if (!result) {
            throw errorHandler(
              "governorate_expertise of " + i + " is not valid"
            );
          }
        })
      );

    await userModel.findByIdAndUpdate(req.userID, {
      ...req.body,
    });
    const response = await userModel.findById(req.user.id);
    successHandler(res, response, "user updated successfully");
  } catch (err) {
    next(err);
  }
};
