const {
  cloudUploadImages,
} = require("../../middlewares/cloudinary/cloudinary");
const { tourModel, userModel } = require("../../models");
const { errorHandler, successHandler } = require("../../utils/responseHandler");
const { imageMapping, stringToArray } = require("../../utils/utils");
const { isAdmin } = require("../auth/auth");

exports.updateTour = async (req, res, next) => {
  try {
    let { expected_photos, photos } = req.files;
    const { id } = req.params;

    const getTour = await tourModel.findById(id).populate("organizer");
    if (!getTour) {
      throw errorHandler("invalid tour id", 404);
    }

    await isAdmin(req.userID);
    if (getTour.organizer.id !== req.userID) {
      throw errorHandler("unauthorized", 401);
    }

    if (photos) {
      photos = await cloudUploadImages(photos);
    }
    if (expected_photos) {
      expected_photos = await cloudUploadImages(expected_photos);
    }
    const handleData = {
      ...getTour,
      photos,
      expected_photos,
      reasons: req.body.reasons,
      plan: {
        meeting_point: req.body.meeting_point,
        city_highlights: req.body.city_highlights,
        hidden_gems: req.body.hidden_gems,
        magical_storytelling: req.body.magical_storytelling,
        special_treat: req.body.special_treat,
      },
    };

    const tour = await tourModel.findByIdAndUpdate(id, handleData);

    successHandler(res, tour, "tour updated successfully");
  } catch (err) {
    next(err);
  }
};
