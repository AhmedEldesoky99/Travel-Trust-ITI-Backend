const { uploadCloudBB } = require("../../middlewares/imgBB");
const { userModel: User } = require("../../models");
const { successHandler } = require("../../utils/responseHandler");
const { isOrganizer } = require("../auth/auth");

exports.uploadIdentity = async (req, res, next) => {
  try {
    console.log("uploadIdentity handler");

    const organizer = await User.findById(req.userID);

    if (organizer?.role !== "organizer") {
      throw errorHandler("restricted to  organizer", 400);
    }

    let civil_photos = { front_civil_photo: [], back_civil_photo: [] };

    await Promise.all(
      req.files.map(async (item) => {
        const uploadedFile = await uploadCloudBB(item.file);

        if (item.name === "front_civil_photo")
          civil_photos.front_civil_photo.push(uploadedFile);

        if (item.name === "back_civil_photo")
          civil_photos.back_civil_photo.push(uploadedFile);
      })
    );

    await User.findByIdAndUpdate(req.userID, {
      civil_photos,
    });

    const user = await User.findById(req.userID).select("civil_photos");

    successHandler(res, user, "photos uploaded successfully");
  } catch (err) {
    next(err);
  }
};
