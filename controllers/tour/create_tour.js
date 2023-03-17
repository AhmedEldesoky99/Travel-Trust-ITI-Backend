const {
  cloudUploadImages,
} = require("../../middlewares/cloudinary/cloudinary");
const { tourModel } = require("../../models/index");
const { errorHandler, successHandler } = require("../../utils/responseHandler");
const { imageMapping, stringToArray } = require("../../utils/utils");
const { isAdmin } = require("../auth/auth");

exports.createTour = async (req, res, next) => {
  try {
    let { expected_photos, photos } = req.files;

    await isAdmin(req.userID);

    if (!photos) {
      throw errorHandler("photos is required", 400);
    }

    if (!expected_photos) {
      throw errorHandler("expected photos is required", 400);
    }

    photos = await cloudUploadImages(photos);
    expected_photos = await cloudUploadImages(expected_photos);

    const handleData = {
      ...req.body,
      photos,
      expected_photos,
      organizer: req.userID,
      reasons: req.body.reasons,
      plan: {
        meeting_point: req.body.meeting_point,
        city_highlights: req.body.city_highlights,
        hidden_gems: req.body.hidden_gems,
        magical_storytelling: req.body.magical_storytelling,
        special_treat: req.body.special_treat,
      },
    };

    const tour = await tourModel.create(handleData);
    successHandler(res, tour, "tour created successfully");
  } catch (err) {
    next(err);
  }
};
