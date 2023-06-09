const { tourModel: Tour, commentModel: Comment } = require("../../models");
const { successHandler, errorHandler } = require("../../utils/responseHandler");

exports.deleteOneTour = async (req, res, next) => {
  try {
    const tour = await Tour.findById(req.params.id).populate("organizer");

    if (!tour) {
      throw errorHandler("tour not found", 404);
    }
    if (tour.organizer.id !== req.userID) {
      throw errorHandler("unauthorized", 401);
    }
    await Tour.findByIdAndRemove(req.params.id);
    await Comment.deleteMany({ tour: req.params.id });
    successHandler(res, undefined, undefined, "tour deleted successfully");
  } catch (err) {
    next(err);
  }
};
