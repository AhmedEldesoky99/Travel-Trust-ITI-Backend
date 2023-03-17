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

    // if (getUser.id !== req.userID) {
    //   throw errorHandler("unauthorized", 401);
    // }

    const photoFile = await sharpHandler(req.files.photo[0].buffer, req.userID);
    const coverFile = await sharpHandler(
      req.files.cover_photo[0].buffer,
      req.userID
    );
    const photo = await uploadCloud(photoFile);
    const cover_photo = await uploadCloud(coverFile);

    console.log([photo], [cover_photo]);
    const handleData = {
      username: req.body.username,
      photo: [photo],
      cover_photo: [cover_photo],
      phone: req.body.phone,
      bio: req.body.bio,
      city: req.body.city,
    };
    const user = new userModel(handleData);
    await userModel.findByIdAndUpdate(req.userID,handleData);
    successHandler(res, user, "user updated successfully");
  } catch (err) {
    next(err);
  }
};
